// src/db/schema.ts
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ============================================================
// ENUMS
// ============================================================

/** Admin manages the platform; user is a regular subscriber. */
export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

/** F1 = AI-generated daily insight. F2 = Expert-authored ICT bias report. */
export const postTypeEnum = pgEnum("post_type", ["insight", "bias"]);

/** Market directional conviction on a given asset. */
export const directionEnum = pgEnum("direction", [
  "bullish",
  "bearish",
  "neutral",
]);

/**
 * Payment provider enum.
 * MVP scope: bkash only.
 * Future: add 'stripe' | 'paypal' | 'crypto' here without a migration,
 * just extend the enum and re-push.
 */
export const paymentProviderEnum = pgEnum("payment_provider", ["bkash"]);

/** Full lifecycle of a payment transaction. */
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",     // Payment initiated, awaiting user action
  "completed",   // bKash trxID confirmed
  "failed",      // User cancelled or payment declined
  "refunded",    // Manual refund issued by admin
]);

/** Full lifecycle of a user's subscription. */
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "trialing",    // Within the 14-day free trial window
  "active",      // Paid and current
  "past_due",    // Payment failed, grace period active
  "canceled",    // User explicitly cancelled
  "expired",     // Trial or subscription period ended without renewal
]);

// ============================================================
// AUTH TABLES — NextAuth v5 / @auth/drizzle-adapter
// These column names and types MUST match exactly what the
// adapter expects. Do not rename them.
// ============================================================

export const users = pgTable("users", {
  // NextAuth adapter requires a text PK — do NOT change to serial/integer.
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  // --- NextAuth core fields ---
  name:          text("name"),
  email:         text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image:         text("image"),

  // --- Credentials provider field (nullable — OAuth users won't have it) ---
  password: text("password"),

  // --- Platform-specific fields ---
  role:        userRoleEnum("role").notNull().default("user"),
  isPro:       boolean("isPro").notNull().default(false),
  trialEndsAt: timestamp("trialEndsAt", { mode: "date" }),

  // --- Timestamps ---
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const accounts = pgTable(
  "accounts",
  {
    userId:            text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type:              text("type").$type<AdapterAccountType>().notNull(),
    provider:          text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token:     text("refresh_token"),
    access_token:      text("access_token"),
    expires_at:        integer("expires_at"),
    token_type:        text("token_type"),
    scope:             text("scope"),
    id_token:          text("id_token"),
    session_state:     text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
    index("accounts_user_id_idx").on(account.userId),
  ]
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId:       text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires:      timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token:      text("token").notNull(),
    expires:    timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [
    primaryKey({ columns: [vt.identifier, vt.token] }),
  ]
);

// ============================================================
// MONETIZATION TABLES
// ============================================================

export const subscriptions = pgTable(
  "subscriptions",
  {
    id:       serial("id").primaryKey(),
    userId:   text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    status:   subscriptionStatusEnum("status").notNull().default("trialing"),
    provider: paymentProviderEnum("provider").notNull(),

    // When the current billing period started
    currentPeriodStart: timestamp("currentPeriodStart", { mode: "date" }).notNull().defaultNow(),
    // When the current billing period ends (null = open-ended / until cancelled)
    currentPeriodEnd:   timestamp("currentPeriodEnd", { mode: "date" }),
    canceledAt:         timestamp("canceledAt", { mode: "date" }),

    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    // Efficient lookup by user (e.g. "get active subscription for user X")
    index("subscriptions_user_id_idx").on(t.userId),
    // Efficient lookup by status (e.g. cron job to expire trialing accounts)
    index("subscriptions_status_idx").on(t.status),
  ]
);

export const payments = pgTable(
  "payments",
  {
    id:             serial("id").primaryKey(),
    userId:         text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    subscriptionId: integer("subscriptionId").references(() => subscriptions.id, { onDelete: "set null" }),
    provider:       paymentProviderEnum("provider").notNull(),
    status:         paymentStatusEnum("status").notNull().default("pending"),

    // Amount in smallest currency unit (e.g., paisa). Never store decimals.
    amount:   integer("amount").notNull(),
    currency: text("currency").notNull().default("BDT"),

    // --- bKash-specific fields ---
    // paymentID returned from bKash /create endpoint (step 1 of checkout)
    bkashPaymentId: text("bkashPaymentId"),
    // trxID returned from bKash /execute endpoint (step 2 — the permanent receipt)
    // This is the idempotency key used to prevent double-processing webhooks.
    bkashTransactionId: text("bkashTransactionId"),
    // Timestamp from bKash execute response
    bkashExecuteTime: timestamp("bkashExecuteTime", { mode: "date" }),

    // Raw webhook payload for audit trail and debugging
    metadata: jsonb("metadata"),

    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    // THE critical idempotency guard: prevents duplicate subscription grants
    // from a replayed bKash webhook. PostgreSQL allows multiple NULLs in a
    // unique index, so pending payments (no trxID yet) won't collide.
    uniqueIndex("payments_bkash_trxid_unique_idx").on(t.bkashTransactionId),

    // Fast lookup by bkashPaymentId during the create → execute flow
    index("payments_bkash_payment_id_idx").on(t.bkashPaymentId),

    // Fast lookup for "has this user paid?" queries
    index("payments_user_status_idx").on(t.userId, t.status),
  ]
);

// ============================================================
// FEATURE TABLES — F1 (Daily Insights) & F2 (ICT Bias)
// ============================================================

/**
 * Top-level grouping for assets.
 * e.g., "Forex Majors", "Forex Minors", "Crypto", "Commodities"
 */
export const categories = pgTable("categories", {
  id:          serial("id").primaryKey(),
  name:        text("name").notNull().unique(),
  slug:        text("slug").notNull().unique(),
  description: text("description"),
  sortOrder:   integer("sortOrder").notNull().default(0),
  createdAt:   timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

/**
 * Tradable instruments — the subjects of all posts.
 * e.g., { symbol: "XAUUSD", name: "Gold / US Dollar", category: "Commodities" }
 */
export const assets = pgTable(
  "assets",
  {
    id:         serial("id").primaryKey(),
    symbol:     text("symbol").notNull().unique(), // "EURUSD" — uppercase, no spaces
    name:       text("name").notNull(),             // "Euro / US Dollar"
    categoryId: integer("categoryId")
      .notNull()
      .references(() => categories.id),
    isActive:   boolean("isActive").notNull().default(true),
    sortOrder:  integer("sortOrder").notNull().default(0),
    createdAt:  timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (t) => [
    index("assets_category_id_idx").on(t.categoryId),
    index("assets_is_active_idx").on(t.isActive),
  ]
);

/**
 * The core content table. Serves BOTH Feature 1 and Feature 2:
 *
 *   type = 'insight'  →  F1 (AI-generated, 20+ assets, gated by blur)
 *   type = 'bias'     →  F2 (Expert-authored ICT report, 3–5 assets, 24h lock)
 *
 * The `summary` field is the teaser shown to guest/free users.
 * The `content` field is the full TipTap-serialised HTML, shown to Premium.
 */
export const posts = pgTable(
  "posts",
  {
    id:        serial("id").primaryKey(),
    type:      postTypeEnum("type").notNull(),
    title:     text("title").notNull(),
    summary:   text("summary"),         // Short teaser — safe to expose to all tiers
    content:   text("content").notNull(), // Full rich-text HTML — gated by tier
    direction: directionEnum("direction"), // Overall asset conviction

    // Every post targets exactly one asset (EURUSD, XAUUSD, etc.)
    assetId: integer("assetId")
      .notNull()
      .references(() => assets.id),

    // The admin who authored/published this post
    authorId: text("authorId")
      .notNull()
      .references(() => users.id),

    isPublished: boolean("isPublished").notNull().default(false),

    // Set when admin clicks "Publish". This timestamp drives the F2 24h lock:
    // free users can read bias posts only after (publishedAt + 24h).
    publishedAt: timestamp("publishedAt", { mode: "date" }),

    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    // Primary feed query: "give me all published insights, newest first"
    index("posts_type_published_at_idx").on(t.type, t.isPublished, t.publishedAt),
    // Asset detail page: "give me all posts for XAUUSD"
    index("posts_asset_id_type_idx").on(t.assetId, t.type),
    // Admin posts list: filter by author
    index("posts_author_id_idx").on(t.authorId),
  ]
);

/**
 * User bookmarks. Both insight and bias posts can be saved.
 * The unique composite index enforces one bookmark per user per post at the DB level.
 */
export const savedPosts = pgTable(
  "savedPosts",
  {
    id:      serial("id").primaryKey(),
    userId:  text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    postId:  integer("postId").notNull().references(() => posts.id, { onDelete: "cascade" }),
    savedAt: timestamp("savedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (t) => [
    // Prevents double-saving and enables O(1) "is this post saved?" checks
    uniqueIndex("saved_posts_user_post_unique_idx").on(t.userId, t.postId),
    // "Show all saved posts for user X" — the primary bookmarks page query
    index("saved_posts_user_id_idx").on(t.userId),
  ]
);

// ============================================================
// RELATIONS — Drizzle query API type-safety layer
// These do NOT affect the DB schema; they enable `.with()` joins
// in Drizzle's relational query API.
// ============================================================

export const usersRelations = relations(users, ({ many }) => ({
  accounts:      many(accounts),
  sessions:      many(sessions),
  posts:         many(posts),
  savedPosts:    many(savedPosts),
  subscriptions: many(subscriptions),
  payments:      many(payments),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  user:     one(users, { fields: [subscriptions.userId], references: [users.id] }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user:         one(users, { fields: [payments.userId], references: [users.id] }),
  subscription: one(subscriptions, {
    fields:     [payments.subscriptionId],
    references: [subscriptions.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  assets: many(assets),
}));

export const assetsRelations = relations(assets, ({ one, many }) => ({
  category: one(categories, { fields: [assets.categoryId], references: [categories.id] }),
  posts:    many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  asset:   one(assets, { fields: [posts.assetId], references: [assets.id] }),
  author:  one(users, { fields: [posts.authorId], references: [users.id] }),
  savedBy: many(savedPosts),
}));

export const savedPostsRelations = relations(savedPosts, ({ one }) => ({
  user: one(users, { fields: [savedPosts.userId], references: [users.id] }),
  post: one(posts, { fields: [savedPosts.postId], references: [posts.id] }),
}));