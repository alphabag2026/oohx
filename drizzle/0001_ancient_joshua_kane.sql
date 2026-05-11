CREATE TABLE `creators` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`imageUrl` text NOT NULL,
	`price` varchar(50) NOT NULL,
	`description` text,
	`category` varchar(50),
	`tags` text,
	`rating` varchar(10) DEFAULT '4.5',
	`reviewCount` int DEFAULT 0,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `creators_id` PRIMARY KEY(`id`)
);
