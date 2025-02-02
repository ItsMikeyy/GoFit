import { sql } from 'drizzle-orm';
import { integer, text, real, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
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

export const exercises = sqliteTable('exercises', {
    id: integer('id').primaryKey(),
    workoutId: integer('workout_id')
      .references(() => workouts.id)
      .notNull(),
    name: text('name').notNull(),
    sets: integer('sets').notNull(),
    reps: integer('reps').notNull(),
    weight: real('weight'),
  });

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

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertWorkouts = typeof workouts.$inferInsert;
export type SelectWorkouts = typeof workouts.$inferSelect;

export type InsertExercises = typeof exercises.$inferInsert;
export type SelectExercises = typeof exercises.$inferSelect;

export type InsertNutritionLogs = typeof nutritionLogs.$inferInsert;
export type SelectNutritionLogs = typeof nutritionLogs.$inferSelect;

