import { relations } from "drizzle-orm";
import { pgTable, uuid, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const files = pgTable("files",{
    id: uuid("id").defaultRandom().primaryKey(),
    // files and folders info
    name: text("name").notNull(),
    path: text("path").notNull(), // This path store nested system 'docs/myfile/hello'
    size: integer("size").notNull(), 
    type: text("type").notNull(), // "File / Folder" 

    // Storage information
    fileurl: text("file_url").notNull(),
    thumbnailUrl: text("thumbnail_URL"),

    // Ownership Info 
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), //if null for root items 

    // file / folders flags 
    isFolder: boolean("is_folder").notNull().default(false),
    isBookmarked: boolean("is_bookmarked").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    //Time stamps
    createAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()

})

// build a relationship in tables 
export const fileRelations = relations(files,({one, many}) => ({
    // there is only one parent 
    parent: one(files,{
        fields: [files.parentId],
        references:[files.id]
    }),

    // relationship between child/folder
    // there is multiple childers show this is here
    childern:many(files)
}))

export const File = typeof files.$inferSelect //is to handled the types 'so we don't need to write the types '
export const NewFile = typeof files.$inferInsert //is to handled the types 'so when we push the data in db than it will help us'