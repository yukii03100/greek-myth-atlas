CREATE TABLE `references` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`kind` text NOT NULL,
	`image` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`source` text DEFAULT '' NOT NULL,
	`license` text DEFAULT '' NOT NULL,
	`transparency` text DEFAULT 'unknown' NOT NULL,
	`created_at` integer NOT NULL
);
