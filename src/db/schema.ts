import { sql } from 'drizzle-orm';
import { integer, text, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from "drizzle-orm";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    unit: text("unit").notNull(),
    gender: text('gender').notNull(),
    age: integer('age'),
    weight: real('weight'),
    height: real('height'),
    goalCalories: integer('goal_calories'),
    goalProtein: integer('goal_protein'),
    goalCarbs: integer('goal_carbs'),
    goalFat: integer('goal_fat'),
  });

export const workouts = sqliteTable('workouts', {
id: integer('id').primaryKey(),
userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
date: text('date').notNull(), 
});

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey(),
  workoutId: integer("workout_id")
    .notNull()
    .references(() => workouts.id, { onDelete: "cascade" }), 
  name: text("name").notNull(), 
  unit: text("unit").notNull(),
  sets: integer("sets").notNull(),
});


export const exerciseSets = sqliteTable("exercise_sets", {
  id: integer("id").primaryKey(),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  reps: integer("reps").notNull(),
  weight: real("weight").notNull(),
  setOrder: integer("set_order").notNull(),
});

export const workoutRelations = relations(workouts, ({ many }) => ({
  exercises: many(exercises),
}));

export const exerciseRelations = relations(exercises, ({ many }) => ({
  sets: many(exerciseSets),
}));

export const nutritionLogs = sqliteTable('nutrition_logs', {
    id: integer('id').primaryKey(),
    userId: integer('user_id')
        .references(() => users.id)
        .notNull(),
    date: text('date').notNull(),
    calories: integer('calories'),
    protein: integer('protein'),
    carbs: integer('carbs'),
    fat: integer('fat'),
});

export const meals = sqliteTable("meals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  nutritionId: integer("nutrition_id").notNull().references(() => nutritionLogs.id, {onDelete: "cascade"}),
  name: text("name").notNull(),
  type: text("type").notNull(), 
  amount: real("amount").notNull(), 
  servingSize: real("servingSize").notNull(), 
  calories: real("calories").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fat: real("fat").notNull(),
  date: text("date").notNull(), 

});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertWorkouts = typeof workouts.$inferInsert;
export type SelectWorkouts = typeof workouts.$inferSelect;

export type InsertExercises = typeof exercises.$inferInsert;
export type SelectExercises = typeof exercises.$inferSelect;

export type InsertExerciseSets = typeof exerciseSets.$inferInsert;
export type SelectExerciseSets = typeof exerciseSets.$inferSelect;


export type InsertNutritionLogs = typeof nutritionLogs.$inferInsert;
export type SelectNutritionLogs = typeof nutritionLogs.$inferSelect;

export type InsertMeals = typeof meals.$inferInsert;
export type SelectMeals = typeof meals.$inferSelect;