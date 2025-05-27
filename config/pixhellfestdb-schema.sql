-- --------------------------------------------------------
-- Hôte:                         141.95.159.41
-- Version du serveur:           10.11.11-MariaDB-0+deb12u1 - Debian 12
-- SE du serveur:                debian-linux-gnu
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour pixhellfestdb
CREATE DATABASE IF NOT EXISTS `pixhellfestdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `pixhellfestdb`;

-- Listage de la structure de table pixhellfestdb. accessoires
CREATE TABLE IF NOT EXISTS `accessoires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `id_console` int(11) DEFAULT NULL,
  `id_reference` int(11) DEFAULT NULL,
  `id_createur` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_console` (`id_console`),
  KEY `id_createur` (`id_createur`),
  CONSTRAINT `accessoires_ibfk_1` FOREIGN KEY (`id_console`) REFERENCES `consoles` (`id`),
  CONSTRAINT `accessoires_ibfk_2` FOREIGN KEY (`id_createur`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.accessoires : ~0 rows (environ)

-- Listage de la structure de table pixhellfestdb. collections_accessoires
CREATE TABLE IF NOT EXISTS `collections_accessoires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int(11) DEFAULT NULL,
  `id_accessoire` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL DEFAULT 1,
  `date_ajout` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_accessoire` (`id_accessoire`),
  CONSTRAINT `collections_accessoires_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `collections_accessoires_ibfk_2` FOREIGN KEY (`id_accessoire`) REFERENCES `accessoires` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.collections_accessoires : ~0 rows (environ)

-- Listage de la structure de table pixhellfestdb. collections_consoles
CREATE TABLE IF NOT EXISTS `collections_consoles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int(11) DEFAULT NULL,
  `id_console` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL DEFAULT 1,
  `date_ajout` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_console` (`id_console`),
  CONSTRAINT `collections_consoles_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `collections_consoles_ibfk_2` FOREIGN KEY (`id_console`) REFERENCES `consoles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.collections_consoles : ~0 rows (environ)

-- Listage de la structure de table pixhellfestdb. collections_jeux
CREATE TABLE IF NOT EXISTS `collections_jeux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int(11) DEFAULT NULL,
  `id_jeu` int(11) DEFAULT NULL,
  `quantite` int(11) NOT NULL DEFAULT 1,
  `date_ajout` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `id_jeu` (`id_jeu`),
  CONSTRAINT `collections_jeux_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `collections_jeux_ibfk_2` FOREIGN KEY (`id_jeu`) REFERENCES `jeux` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.collections_jeux : ~0 rows (environ)

-- Listage de la structure de table pixhellfestdb. consoles
CREATE TABLE IF NOT EXISTS `consoles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `constructeur` varchar(100) NOT NULL,
  `annee_sortie` year(4) DEFAULT NULL,
  `id_reference` int(11) DEFAULT NULL,
  `id_createur` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_createur` (`id_createur`),
  CONSTRAINT `consoles_ibfk_1` FOREIGN KEY (`id_createur`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.consoles : ~0 rows (environ)

-- Listage de la structure de table pixhellfestdb. jeux
CREATE TABLE IF NOT EXISTS `jeux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `editeur` varchar(100) DEFAULT NULL,
  `developpeur` varchar(100) DEFAULT NULL,
  `annee_sortie` year(4) DEFAULT NULL,
  `id_reference` int(11) DEFAULT NULL,
  `id_createur` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_createur` (`id_createur`),
  CONSTRAINT `jeux_ibfk_1` FOREIGN KEY (`id_createur`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.jeux : ~0 rows (environ)

-- Listage de la structure de table pixhellfestdb. referentiel
CREATE TABLE IF NOT EXISTS `referentiel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `valeur` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.referentiel : ~0 rows (environ)

-- Listage de la structure de table pixhellfestdb. utilisateurs
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` enum('admin','utilisateur') NOT NULL DEFAULT 'utilisateur',
  `date_inscription` datetime DEFAULT curdate(),
  `token` varchar(255) DEFAULT NULL,
  `date_expiration` datetime DEFAULT curdate(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table pixhellfestdb.utilisateurs : ~1 rows (environ)
INSERT INTO `utilisateurs` (`id`, `nom`, `email`, `mot_de_passe`, `role`, `date_inscription`, `token`, `date_expiration`) VALUES
	(1, 'MrSamafu', 'samson.flamme@hotmail.fr', '$2b$10$spP9r5jHMhYVVJqEsOfvs.YpE9Ti1R25nSdPzpN9/IAqf/jRvGtxy', 'admin', '2025-01-19 19:06:58', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ4MzQ2Njk3LCJleHAiOjE3NDgzNTAyOTd9.jYwFwi5nmHW_Y_Oy3G2wMD72gIauXOd1oTqFOdNTMaw', '2025-05-27 11:51:37');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
