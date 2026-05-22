-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 29, 2024 at 02:38 PM
-- Server version: 10.5.20-MariaDB-cll-lve-log
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `horizonitbims_aplus`
--

-- --------------------------------------------------------

--
-- Table structure for table `list_countries`
--

CREATE TABLE `list_countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL,
  `phone_code` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_countries`
--

INSERT INTO `list_countries` (`id`, `name`, `short_name`, `phone_code`) VALUES
(1, 'Afghanistan', 'AF', 93),
(2, 'Albania', 'AL', 355),
(3, 'Algeria', 'DZ', 213),
(4, 'American Samoa', 'AS', 1684),
(5, 'Andorra', 'AD', 376),
(6, 'Angola', 'AO', 244),
(7, 'Anguilla', 'AI', 1264),
(8, 'Antarctica', 'AQ', 0),
(9, 'Antigua And Barbuda', 'AG', 1268),
(10, 'Argentina', 'AR', 54),
(11, 'Armenia', 'AM', 374),
(12, 'Aruba', 'AW', 297),
(13, 'Australia', 'AU', 61),
(14, 'Austria', 'AT', 43),
(15, 'Azerbaijan', 'AZ', 994),
(16, 'Bahamas The', 'BS', 1242),
(17, 'Bahrain', 'BH', 973),
(18, 'Bangladesh', 'BD', 880),
(19, 'Barbados', 'BB', 1246),
(20, 'Belarus', 'BY', 375),
(21, 'Belgium', 'BE', 32),
(22, 'Belize', 'BZ', 501),
(23, 'Benin', 'BJ', 229),
(24, 'Bermuda', 'BM', 1441),
(25, 'Bhutan', 'BT', 975),
(26, 'Bolivia', 'BO', 591),
(27, 'Bosnia and Herzegovina', 'BA', 387),
(28, 'Botswana', 'BW', 267),
(29, 'Bouvet Island', 'BV', 0),
(30, 'Brazil', 'BR', 55),
(31, 'British Indian Ocean Territory', 'IO', 246),
(32, 'Brunei', 'BN', 673),
(33, 'Bulgaria', 'BG', 359),
(34, 'Burkina Faso', 'BF', 226),
(35, 'Burundi', 'BI', 257),
(36, 'Cambodia', 'KH', 855),
(37, 'Cameroon', 'CM', 237),
(38, 'Canada', 'CA', 1),
(39, 'Cape Verde', 'CV', 238),
(40, 'Cayman Islands', 'KY', 1345),
(41, 'Central African Republic', 'CF', 236),
(42, 'Chad', 'TD', 235),
(43, 'Chile', 'CL', 56),
(44, 'China', 'CN', 86),
(45, 'Christmas Island', 'CX', 61),
(46, 'Cocos (Keeling) Islands', 'CC', 672),
(47, 'Colombia', 'CO', 57),
(48, 'Comoros', 'KM', 269),
(49, 'Republic Of The Congo', 'CG', 242),
(50, 'Democratic Republic Of The Congo', 'CD', 242),
(51, 'Cook Islands', 'CK', 682),
(52, 'Costa Rica', 'CR', 506),
(53, 'Cote D\'Ivoire (Ivory Coast)', 'CI', 225),
(54, 'Croatia (Hrvatska)', 'HR', 385),
(55, 'Cuba', 'CU', 53),
(56, 'Cyprus', 'CY', 357),
(57, 'Czech Republic', 'CZ', 420),
(58, 'Denmark', 'DK', 45),
(59, 'Djibouti', 'DJ', 253),
(60, 'Dominica', 'DM', 1767),
(61, 'Dominican Republic', 'DO', 1809),
(62, 'East Timor', 'TP', 670),
(63, 'Ecuador', 'EC', 593),
(64, 'Egypt', 'EG', 20),
(65, 'El Salvador', 'SV', 503),
(66, 'Equatorial Guinea', 'GQ', 240),
(67, 'Eritrea', 'ER', 291),
(68, 'Estonia', 'EE', 372),
(69, 'Ethiopia', 'ET', 251),
(70, 'External Territories of Australia', 'XA', 61),
(71, 'Falkland Islands', 'FK', 500),
(72, 'Faroe Islands', 'FO', 298),
(73, 'Fiji Islands', 'FJ', 679),
(74, 'Finland', 'FI', 358),
(75, 'France', 'FR', 33),
(76, 'French Guiana', 'GF', 594),
(77, 'French Polynesia', 'PF', 689),
(78, 'French Southern Territories', 'TF', 0),
(79, 'Gabon', 'GA', 241),
(80, 'Gambia The', 'GM', 220),
(81, 'Georgia', 'GE', 995),
(82, 'Germany', 'DE', 49),
(83, 'Ghana', 'GH', 233),
(84, 'Gibraltar', 'GI', 350),
(85, 'Greece', 'GR', 30),
(86, 'Greenland', 'GL', 299),
(87, 'Grenada', 'GD', 1473),
(88, 'Guadeloupe', 'GP', 590),
(89, 'Guam', 'GU', 1671),
(90, 'Guatemala', 'GT', 502),
(91, 'Guernsey and Alderney', 'XU', 44),
(92, 'Guinea', 'GN', 224),
(93, 'Guinea-Bissau', 'GW', 245),
(94, 'Guyana', 'GY', 592),
(95, 'Haiti', 'HT', 509),
(96, 'Heard and McDonald Islands', 'HM', 0),
(97, 'Honduras', 'HN', 504),
(98, 'Hong Kong S.A.R.', 'HK', 852),
(99, 'Hungary', 'HU', 36),
(100, 'Iceland', 'IS', 354),
(101, 'India', 'IN', 91),
(102, 'Indonesia', 'ID', 62),
(103, 'Iran', 'IR', 98),
(104, 'Iraq', 'IQ', 964),
(105, 'Ireland', 'IE', 353),
(106, 'Israel', 'IL', 972),
(107, 'Italy', 'IT', 39),
(108, 'Jamaica', 'JM', 1876),
(109, 'Japan', 'JP', 81),
(110, 'Jersey', 'XJ', 44),
(111, 'Jordan', 'JO', 962),
(112, 'Kazakhstan', 'KZ', 7),
(113, 'Kenya', 'KE', 254),
(114, 'Kiribati', 'KI', 686),
(115, 'Korea North', 'KP', 850),
(116, 'Korea South', 'KR', 82),
(117, 'Kuwait', 'KW', 965),
(118, 'Kyrgyzstan', 'KG', 996),
(119, 'Laos', 'LA', 856),
(120, 'Latvia', 'LV', 371),
(121, 'Lebanon', 'LB', 961),
(122, 'Lesotho', 'LS', 266),
(123, 'Liberia', 'LR', 231),
(124, 'Libya', 'LY', 218),
(125, 'Liechtenstein', 'LI', 423),
(126, 'Lithuania', 'LT', 370),
(127, 'Luxembourg', 'LU', 352),
(128, 'Macau S.A.R.', 'MO', 853),
(129, 'Macedonia', 'MK', 389),
(130, 'Madagascar', 'MG', 261),
(131, 'Malawi', 'MW', 265),
(132, 'Malaysia', 'MY', 60),
(133, 'Maldives', 'MV', 960),
(134, 'Mali', 'ML', 223),
(135, 'Malta', 'MT', 356),
(136, 'Man (Isle of)', 'XM', 44),
(137, 'Marshall Islands', 'MH', 692),
(138, 'Martinique', 'MQ', 596),
(139, 'Mauritania', 'MR', 222),
(140, 'Mauritius', 'MU', 230),
(141, 'Mayotte', 'YT', 269),
(142, 'Mexico', 'MX', 52),
(143, 'Micronesia', 'FM', 691),
(144, 'Moldova', 'MD', 373),
(145, 'Monaco', 'MC', 377),
(146, 'Mongolia', 'MN', 976),
(147, 'Montserrat', 'MS', 1664),
(148, 'Morocco', 'MA', 212),
(149, 'Mozambique', 'MZ', 258),
(150, 'Myanmar', 'MM', 95),
(151, 'Namibia', 'NA', 264),
(152, 'Nauru', 'NR', 674),
(153, 'Nepal', 'NP', 977),
(154, 'Netherlands Antilles', 'AN', 599),
(155, 'Netherlands The', 'NL', 31),
(156, 'New Caledonia', 'NC', 687),
(157, 'New Zealand', 'NZ', 64),
(158, 'Nicaragua', 'NI', 505),
(159, 'Niger', 'NE', 227),
(160, 'Nigeria', 'NG', 234),
(161, 'Niue', 'NU', 683),
(162, 'Norfolk Island', 'NF', 672),
(163, 'Northern Mariana Islands', 'MP', 1670),
(164, 'Norway', 'NO', 47),
(165, 'Oman', 'OM', 968),
(166, 'Pakistan', 'PK', 92),
(167, 'Palau', 'PW', 680),
(168, 'Palestinian Territory Occupied', 'PS', 970),
(169, 'Panama', 'PA', 507),
(170, 'Papua new Guinea', 'PG', 675),
(171, 'Paraguay', 'PY', 595),
(172, 'Peru', 'PE', 51),
(173, 'Philippines', 'PH', 63),
(174, 'Pitcairn Island', 'PN', 0),
(175, 'Poland', 'PL', 48),
(176, 'Portugal', 'PT', 351),
(177, 'Puerto Rico', 'PR', 1787),
(178, 'Qatar', 'QA', 974),
(179, 'Reunion', 'RE', 262),
(180, 'Romania', 'RO', 40),
(181, 'Russia', 'RU', 70),
(182, 'Rwanda', 'RW', 250),
(183, 'Saint Helena', 'SH', 290),
(184, 'Saint Kitts And Nevis', 'KN', 1869),
(185, 'Saint Lucia', 'LC', 1758),
(186, 'Saint Pierre and Miquelon', 'PM', 508),
(187, 'Saint Vincent And The Grenadines', 'VC', 1784),
(188, 'Samoa', 'WS', 684),
(189, 'San Marino', 'SM', 378),
(190, 'Sao Tome and Principe', 'ST', 239),
(191, 'Saudi Arabia', 'SA', 966),
(192, 'Senegal', 'SN', 221),
(193, 'Serbia', 'RS', 381),
(194, 'Seychelles', 'SC', 248),
(195, 'Sierra Leone', 'SL', 232),
(196, 'Singapore', 'SG', 65),
(197, 'Slovakia', 'SK', 421),
(198, 'Slovenia', 'SI', 386),
(199, 'Smaller Territories of the UK', 'XG', 44),
(200, 'Solomon Islands', 'SB', 677),
(201, 'Somalia', 'SO', 252),
(202, 'South Africa', 'ZA', 27),
(203, 'South Georgia', 'GS', 0),
(204, 'South Sudan', 'SS', 211),
(205, 'Spain', 'ES', 34),
(206, 'Sri Lanka', 'LK', 94),
(207, 'Sudan', 'SD', 249),
(208, 'Suriname', 'SR', 597),
(209, 'Svalbard And Jan Mayen Islands', 'SJ', 47),
(210, 'Swaziland', 'SZ', 268),
(211, 'Sweden', 'SE', 46),
(212, 'Switzerland', 'CH', 41),
(213, 'Syria', 'SY', 963),
(214, 'Taiwan', 'TW', 886),
(215, 'Tajikistan', 'TJ', 992),
(216, 'Tanzania', 'TZ', 255),
(217, 'Thailand', 'TH', 66),
(218, 'Togo', 'TG', 228),
(219, 'Tokelau', 'TK', 690),
(220, 'Tonga', 'TO', 676),
(221, 'Trinidad And Tobago', 'TT', 1868),
(222, 'Tunisia', 'TN', 216),
(223, 'Turkey', 'TR', 90),
(224, 'Turkmenistan', 'TM', 7370),
(225, 'Turks And Caicos Islands', 'TC', 1649),
(226, 'Tuvalu', 'TV', 688),
(227, 'Uganda', 'UG', 256),
(228, 'Ukraine', 'UA', 380),
(229, 'United Arab Emirates', 'AE', 971),
(230, 'United Kingdom', 'GB', 44),
(231, 'United States', 'US', 1),
(232, 'United States Minor Outlying Islands', 'UM', 1),
(233, 'Uruguay', 'UY', 598),
(234, 'Uzbekistan', 'UZ', 998),
(235, 'Vanuatu', 'VU', 678),
(236, 'Vatican City State (Holy See)', 'VA', 39),
(237, 'Venezuela', 'VE', 58),
(238, 'Vietnam', 'VN', 84),
(239, 'Virgin Islands (British)', 'VG', 1284),
(240, 'Virgin Islands (US)', 'VI', 1340),
(241, 'Wallis And Futuna Islands', 'WF', 681),
(242, 'Western Sahara', 'EH', 212),
(243, 'Yemen', 'YE', 967),
(244, 'Yugoslavia', 'YU', 38),
(245, 'Zambia', 'ZM', 260),
(246, 'Zimbabwe', 'ZW', 263);

-- --------------------------------------------------------

--
-- Table structure for table `list_dropdown`
--

CREATE TABLE `list_dropdown` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `sequence` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_dropdown`
--

INSERT INTO `list_dropdown` (`id`, `name`, `type`, `sequence`) VALUES
(1, 'I am an Australian citizen with valid passport', 'work-status', 1),
(2, 'I am on student visa and I have right to work in Australia', 'work-status', 2),
(3, 'Between 1 to 5 hours', 'availability', 1),
(4, 'Between 5 to 10 hours', 'availability', 2),
(5, 'Between 10 to 15 hours', 'availability', 3),
(6, 'Between 15 to 20 hours', 'availability', 4),
(7, 'Between 20 to 25 hours', 'availability', 5),
(8, 'Between 25 to 30 hours', 'availability', 6),
(9, 'Between 30+ hours', 'availability', 7),
(10, 'Hours in detail', 'availability', 8),
(11, 'Cleaning', 'service-willing-to-provide', 1),
(12, 'Support worker', 'service-willing-to-provide', 2),
(13, 'Help around the house', 'service-willing-to-provide', 3),
(14, 'In-home care', 'service-willing-to-provide', 4),
(15, 'Personal care (PCA)', 'service-willing-to-provide', 5),
(16, 'Out and about (community and social assistance)', 'service-willing-to-provide', 6),
(17, 'Education, training or employment', 'service-willing-to-provide', 7),
(18, 'Therapy support', 'service-willing-to-provide', 8),
(19, 'Transport support', 'service-willing-to-provide', 9),
(20, 'Specialist support (high needs)', 'service-willing-to-provide', 10),
(21, 'Others', 'service-willing-to-provide', 11),
(22, '6 Months', 'experience-years', 1),
(23, '1 Years', 'experience-years', 2),
(24, '2 Years', 'experience-years', 3),
(25, '3 Years', 'experience-years', 4),
(26, '4 Years', 'experience-years', 5),
(27, '5 Years', 'experience-years', 6),
(28, '6 Years', 'experience-years', 7),
(29, '7 Years', 'experience-years', 8),
(30, '8 Years', 'experience-years', 9),
(31, '9 Years', 'experience-years', 10),
(32, '10 Years', 'experience-years', 11),
(33, 'Manual handling (lifting, hoisting, transfers)', 'experience-in-fields', 1),
(34, 'Anaphylaxis', 'experience-in-fields', 2),
(35, 'Allergies', 'experience-in-fields', 3),
(36, 'Epilepsy or seizures', 'experience-in-fields', 4),
(37, 'Catheter or Condom Drainage', 'experience-in-fields', 5),
(38, 'Medication management', 'experience-in-fields', 6),
(39, 'Mealtime management', 'experience-in-fields', 7),
(40, 'Swallowing and nutrition', 'experience-in-fields', 8),
(41, 'Bowel care', 'experience-in-fields', 9),
(42, 'Diabetes management', 'experience-in-fields', 10),
(43, 'Behavior management', 'experience-in-fields', 11),
(44, 'Asthma', 'experience-in-fields', 12),
(45, 'Mental health', 'experience-in-fields', 13),
(46, 'Ventilator Care', 'experience-in-fields', 14),
(47, 'Wound / Pressure Care', 'experience-in-fields', 15),
(48, 'Others', 'experience-in-fields', 16),
(49, '5 to 10', 'km-to-travel', 1),
(50, '10 to 15', 'km-to-travel', 2),
(51, '15 to 20', 'km-to-travel', 3),
(52, '20 to 25', 'km-to-travel', 4),
(53, '25 to 30', 'km-to-travel', 5),
(54, 'Other', 'km-to-travel', 6),
(55, 'Assist-Personal Activities', 'ndis-services', 1),
(56, 'Innov Community Participation', 'ndis-services', 2),
(57, 'Household Tasks', 'ndis-services', 3),
(58, 'Participate Community', 'ndis-services', 4),
(59, 'Group/Centre Activities', 'ndis-services', 5),
(60, 'Support Coordination', 'ndis-services', 6),
(61, 'Accommodation', 'ndis-services', 7),
(62, 'Interpret Translate', 'ndis-services', 8),
(63, 'Gardening', 'ndis-services', 9),
(64, 'Respite', 'ndis-services', 10),
(65, 'Support Independent Living', 'ndis-services', 11),
(66, 'Specialist Disability', 'ndis-services', 12);

-- --------------------------------------------------------

--
-- Table structure for table `list_hear_about`
--

CREATE TABLE `list_hear_about` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_hear_about`
--

INSERT INTO `list_hear_about` (`id`, `name`) VALUES
(1, 'Facebook'),
(2, 'Instagram'),
(3, 'Google Search'),
(4, 'Friends'),
(5, 'Another support worker already registered in A-Plus Hire'),
(6, 'Support Coordinator'),
(7, 'Plan Manager'),
(8, 'Family Friends');

-- --------------------------------------------------------

--
-- Table structure for table `list_industries`
--

CREATE TABLE `list_industries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_industries`
--

INSERT INTO `list_industries` (`id`, `name`) VALUES
(1, 'Disability'),
(2, 'Aged care'),
(3, 'Other Health Care or Social Assistance'),
(4, 'Education and Training'),
(5, 'Arts and Recreation Services'),
(6, 'Accommodation and Food Services'),
(7, 'Agriculture, Forestry and Fishing'),
(8, 'Mining'),
(9, 'Manufacturing'),
(10, 'Electricity, Gas, Water and Waste Services'),
(11, 'Construction'),
(12, 'Wholesale Trade'),
(13, 'Retail Trade'),
(14, 'Transport, Postal and Warehousing'),
(15, 'Information Media and Telecommunications'),
(16, 'Financial and Insurance Services'),
(17, 'Rental, Hiring and Real Estate Services'),
(18, 'Professional, Scientific and Technical Services'),
(19, 'Administrative and Support Services'),
(20, 'Public Administration and Safety'),
(21, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `list_languages`
--

CREATE TABLE `list_languages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `language_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_languages`
--

INSERT INTO `list_languages` (`id`, `name`, `language_code`) VALUES
(1, 'Afrikaans', 'af'),
(2, 'Albanian - shqip', 'sq'),
(3, 'Amharic - አማርኛ', 'am'),
(4, 'Arabic - العربية', 'ar'),
(5, 'Aragonese - aragonés', 'an'),
(6, 'Armenian - հայերեն', 'hy'),
(7, 'Asturian - asturianu', 'ast'),
(8, 'Azerbaijani - azərbaycan dili', 'az'),
(9, 'Basque - euskara', 'eu'),
(10, 'Belarusian - беларуская', 'be'),
(11, 'Bengali - বাংলা', 'bn'),
(12, 'Bosnian - bosanski', 'bs'),
(13, 'Breton - brezhoneg', 'br'),
(14, 'Bulgarian - български', 'bg'),
(15, 'Catalan - català', 'ca'),
(16, 'Central Kurdish - کوردی (دەستنوسی عەرەبی)', 'ckb'),
(17, 'Chinese - 中文', 'zh'),
(18, 'Chinese (Hong Kong) - 中文（香港）', 'zh-HK'),
(19, 'Chinese (Simplified) - 中文（简体）', 'zh-CN'),
(20, 'Chinese (Traditional) - 中文（繁體）', 'zh-TW'),
(21, 'Corsican', 'co'),
(22, 'Croatian - hrvatski', 'hr'),
(23, 'Czech - čeština', 'cs'),
(24, 'Danish - dansk', 'da'),
(25, 'Dutch - Nederlands', 'nl'),
(26, 'English', 'en'),
(27, 'English (Australia)', 'en-AU'),
(28, 'English (Canada)', 'en-CA'),
(29, 'English (India)', 'en-IN'),
(30, 'English (New Zealand)', 'en-NZ'),
(31, 'English (South Africa)', 'en-ZA'),
(32, 'English (United Kingdom)', 'en-GB'),
(33, 'English (United States)', 'en-US'),
(34, 'Esperanto - esperanto', 'eo'),
(35, 'Estonian - eesti', 'et'),
(36, 'Faroese - føroyskt', 'fo'),
(37, 'Filipino', 'fil'),
(38, 'Finnish - suomi', 'fi'),
(39, 'French - français', 'fr'),
(40, 'French (Canada) - français (Canada)', 'fr-CA'),
(41, 'French (France) - français (France)', 'fr-FR'),
(42, 'French (Switzerland) - français (Suisse)', 'fr-CH'),
(43, 'Galician - galego', 'gl'),
(44, 'Georgian - ქართული', 'ka'),
(45, 'German - Deutsch', 'de'),
(46, 'German (Austria) - Deutsch (Österreich)', 'de-AT'),
(47, 'German (Germany) - Deutsch (Deutschland)', 'de-DE'),
(48, 'German (Liechtenstein) - Deutsch (Liechtenstein)', 'de-LI'),
(49, 'German (Switzerland) - Deutsch (Schweiz)', 'de-CH'),
(50, 'Greek - Ελληνικά', 'el'),
(51, 'Guarani', 'gn'),
(52, 'Gujarati - ગુજરાતી', 'gu'),
(53, 'Hausa', 'ha'),
(54, 'Hawaiian - ʻŌlelo Hawaiʻi', 'haw'),
(55, 'Hebrew - עברית', 'he'),
(56, 'Hindi - हिन्दी', 'hi'),
(57, 'Hungarian - magyar', 'hu'),
(58, 'Icelandic - íslenska', 'is'),
(59, 'Indonesian - Indonesia', 'id'),
(60, 'Interlingua', 'ia'),
(61, 'Irish - Gaeilge', 'ga'),
(62, 'Italian - italiano', 'it'),
(63, 'Italian (Italy) - italiano (Italia)', 'it-IT'),
(64, 'Italian (Switzerland) - italiano (Svizzera)', 'it-CH'),
(65, 'Japanese - 日本語', 'ja'),
(66, 'Kannada - ಕನ್ನಡ', 'kn'),
(67, 'Kazakh - қазақ тілі', 'kk'),
(68, 'Khmer - ខ្មែរ', 'km'),
(69, 'Korean - 한국어', 'ko'),
(70, 'Kurdish - Kurdî', 'ku'),
(71, 'Kyrgyz - кыргызча', 'ky'),
(72, 'Lao - ລາວ', 'lo'),
(73, 'Latin', 'la'),
(74, 'Latvian - latviešu', 'lv'),
(75, 'Lingala - lingála', 'ln'),
(76, 'Lithuanian - lietuvių', 'lt'),
(77, 'Macedonian - македонски', 'mk'),
(78, 'Malay - Bahasa Melayu', 'ms'),
(79, 'Malayalam - മലയാളം', 'ml'),
(80, 'Maltese - Malti', 'mt'),
(81, 'Marathi - मराठी', 'mr'),
(82, 'Mongolian - монгол', 'mn'),
(83, 'Nepali - नेपाली', 'ne'),
(84, 'Norwegian - norsk', 'no'),
(85, 'Norwegian Bokmål - norsk bokmål', 'nb'),
(86, 'Norwegian Nynorsk - nynorsk', 'nn'),
(87, 'Occitan', 'oc'),
(88, 'Oriya - ଓଡ଼ିଆ', 'or'),
(89, 'Oromo - Oromoo', 'om'),
(90, 'Pashto - پښتو', 'ps'),
(91, 'Persian - فارسی', 'fa'),
(92, 'Polish - polski', 'pl'),
(93, 'Portuguese - português', 'pt'),
(94, 'Portuguese (Brazil) - português (Brasil)', 'pt-BR'),
(95, 'Portuguese (Portugal) - português (Portugal)', 'pt-PT'),
(96, 'Punjabi - ਪੰਜਾਬੀ', 'pa'),
(97, 'Quechua', 'qu'),
(98, 'Romanian - română', 'ro'),
(99, 'Romanian (Moldova) - română (Moldova)', 'mo'),
(100, 'Romansh - rumantsch', 'rm'),
(101, 'Russian - русский', 'ru'),
(102, 'Scottish Gaelic', 'gd'),
(103, 'Serbian - српски', 'sr'),
(104, 'Serbo-Croatian - Srpskohrvatski', 'sh'),
(105, 'Shona - chiShona', 'sn'),
(106, 'Sindhi', 'sd'),
(107, 'Sinhala - සිංහල', 'si'),
(108, 'Slovak - slovenčina', 'sk'),
(109, 'Slovenian - slovenščina', 'sl'),
(110, 'Somali - Soomaali', 'so'),
(111, 'Southern Sotho', 'st'),
(112, 'Spanish - español', 'es'),
(113, 'Spanish (Argentina) - español (Argentina)', 'es-AR'),
(114, 'Spanish (Latin America) - español (Latinoamérica)', 'es-419'),
(115, 'Spanish (Mexico) - español (México)', 'es-MX'),
(116, 'Spanish (Spain) - español (España)', 'es-ES'),
(117, 'Spanish (United States) - español (Estados Unidos)', 'es-US'),
(118, 'Sundanese', 'su'),
(119, 'Swahili - Kiswahili', 'sw'),
(120, 'Swedish - svenska', 'sv'),
(121, 'Tajik - тоҷикӣ', 'tg'),
(122, 'Tamil - தமிழ்', 'ta'),
(123, 'Tatar', 'tt'),
(124, 'Telugu - తెలుగు', 'te'),
(125, 'Thai - ไทย', 'th'),
(126, 'Tigrinya - ትግርኛ', 'ti'),
(127, 'Tongan - lea fakatonga', 'to'),
(128, 'Turkish - Türkçe', 'tr'),
(129, 'Turkmen', 'tk'),
(130, 'Twi', 'tw'),
(131, 'Ukrainian - українська', 'uk'),
(132, 'Urdu - اردو', 'ur'),
(133, 'Uyghur', 'ug'),
(134, 'Uzbek - o‘zbek', 'uz'),
(135, 'Vietnamese - Tiếng Việt', 'vi'),
(136, 'Walloon - wa', 'wa'),
(137, 'Welsh - Cymraeg', 'cy'),
(138, 'Western Frisian', 'fy'),
(139, 'Xhosa', 'xh'),
(140, 'Yiddish', 'yi'),
(141, 'Yoruba - Èdè Yorùbá', 'yo'),
(142, 'Zulu - isiZulu', 'zu');

-- --------------------------------------------------------

--
-- Table structure for table `list_states`
--

CREATE TABLE `list_states` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_states`
--

INSERT INTO `list_states` (`id`, `name`, `short_name`) VALUES
(1, 'New South Wales', 'NSW'),
(2, 'Victoria', 'VIC'),
(3, 'Queensland', 'QLD'),
(4, 'Western Australia', 'WA'),
(5, 'South Australia', 'SA'),
(6, 'Northern Territory', 'NT');

-- --------------------------------------------------------

--
-- Table structure for table `ndis_provider`
--

CREATE TABLE `ndis_provider` (
  `id` int(11) NOT NULL,
  `user_ref_id` int(11) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `about_your_company` text DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `self_describe_explain` text DEFAULT NULL,
  `services_you_provide` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ndis_provider`
--

INSERT INTO `ndis_provider` (`id`, `user_ref_id`, `company_name`, `about_your_company`, `gender`, `self_describe_explain`, `services_you_provide`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 13, 'Good Care Disability Services', 'We are NDIS Provider in Victoria', 'Female', NULL, '(%)55(%)56(%)57(%)58(%)59(%)60(%)63(%)', 'active', '2023-09-19 16:54:36', '2024-01-30 00:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `connects` int(11) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `regular_price` float DEFAULT NULL,
  `sale_price` float DEFAULT NULL,
  `list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`list`)),
  `list_icon` varchar(255) DEFAULT NULL,
  `list_label` varchar(255) DEFAULT NULL,
  `list_strike` varchar(255) DEFAULT NULL,
  `is_free_plan` tinyint(1) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `name`, `desc`, `connects`, `currency`, `regular_price`, `sale_price`, `list`, `list_icon`, `list_label`, `list_strike`, `is_free_plan`, `is_default`, `status`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Bacis Free', 'Best for medium business owners, startups.', 50, '$', 50, 40, '{\"icon\":{\"1\":\"las la-check\",\"2\":\"las la-times\",\"3\":\"las la-times\",\"4\":\"las la-times\",\"5\":\"las la-times\"},\"label\":{\"1\":\"50 Connects\",\"2\":\"Best of Developers\",\"3\":\"Made with TailwindCSS\",\"4\":\"Premium Support\",\"5\":\"Future Updates\"},\"strike\":{\"1\":false,\"2\":true,\"3\":true,\"4\":true,\"5\":true}}', '(%)las la-check(%)las la-times(%)las la-times(%)las la-times(%)las la-times(%)', '(%)50 Connects(%)Best of Developers(%)Made with TailwindCSS(%)Premium Support(%)Future Updates(%)', '(%)false(%)true(%)true(%)true(%)true(%)', 1, 1, 'Active', 1, 1, '2023-07-16 18:22:36', '2023-09-14 20:44:55'),
(2, 'Premuim', 'Best for medium business owners, startups.', 100, '$', 100, 80, '{\"label\":{\"1\":\"100 Connects\",\"2\":\"Best of Developer\",\"3\":\"Made with TailwindCSS\",\"4\":\"Primium Support\",\"5\":\"Future Updates\"},\"icon\":{\"1\":\"las la-check\",\"2\":\"las la-check\",\"3\":\"las la-times\",\"4\":\"las la-times\",\"5\":\"las la-times\"},\"strike\":{\"1\":false,\"2\":false,\"3\":true,\"4\":true,\"5\":true}}', '(%)las la-check(%)las la-check(%)las la-times(%)las la-times(%)las la-times(%)', '(%)100 Connects(%)Best of Developer(%)Made with TailwindCSS(%)Primium Support(%)Future Updates(%)', '(%)false(%)false(%)true(%)true(%)true(%)', 0, 0, 'Active', 1, 1, '2023-07-16 18:29:30', '2024-01-29 16:49:30'),
(3, 'Enterprise', 'Best for medium business owners, startups.', 150, '$', 150, 120, '{\"icon\":{\"1\":\"las la-check\",\"2\":\"las la-check\",\"3\":\"las la-check\",\"4\":\"las la-times\",\"5\":\"las la-times\"},\"label\":{\"1\":\"150 Connects\",\"2\":\"Best of Developers\",\"3\":\"Made with TailwindCSS\",\"4\":\"Premium Support\",\"5\":\"Future Updates\"},\"strike\":{\"1\":false,\"2\":false,\"3\":false,\"4\":true,\"5\":true}}', '(%)las la-check(%)las la-check(%)las la-check(%)las la-times(%)las la-times(%)', '(%)150 Connects(%)Best of Developers(%)Made with TailwindCSS(%)Premium Support(%)Future Updates(%)', '(%)false(%)false(%)false(%)true(%)true(%)', 0, 0, 'Active', 1, 1, '2023-07-17 16:01:43', '2024-01-29 16:49:23'),
(4, 'Ultra', 'Best for medium business owners, startups.', 200, '$', 200, 160, '{\"icon\":{\"1\":\"las la-check\",\"2\":\"las la-exclamation\",\"3\":\"las la-check\",\"4\":\"las la-check\",\"5\":\"las la-check\"},\"label\":{\"1\":\"200 Connects\",\"2\":\"Best of Developers\",\"3\":\"Made with TailwindCSS\",\"4\":\"Premium Support\",\"5\":\"Future Updates\"},\"strike\":{\"1\":false,\"2\":false,\"3\":false,\"4\":false,\"5\":false}}', '(%)las la-check(%)las la-exclamation(%)las la-check(%)las la-check(%)las la-check(%)', '(%)200 Connects(%)Best of Developers(%)Made with TailwindCSS(%)Premium Support(%)Future Updates(%)', '(%)false(%)false(%)false(%)false(%)false(%)', 0, 0, 'Active', 1, 1, '2023-07-17 16:06:20', '2023-08-22 19:50:52'),
(5, 'Pro Ultra', 'Best for medium business owners, startups.', 250, '$', 250, 200, '{\"icon\":{\"1\":\"las la-check\",\"2\":\"las la-check\",\"3\":\"las la-check\",\"4\":\"las la-check\",\"5\":\"las la-check\"},\"label\":{\"1\":\"250 Connects\",\"2\":\"Best of Developers\",\"3\":\"Made with TailwindCSS\",\"4\":\"Premium Support\",\"5\":\"Future Updates\"},\"strike\":{\"1\":false,\"2\":false,\"3\":false,\"4\":false,\"5\":false}}', '(%)las la-check(%)las la-check(%)las la-check(%)las la-check(%)las la-check(%)', '(%)250 Connects(%)Best of Developers(%)Made with TailwindCSS(%)Premium Support(%)Future Updates(%)', '(%)false(%)false(%)false(%)false(%)false(%)', 0, 0, 'Active', 1, 1, '2023-07-18 22:47:15', '2023-08-22 19:50:45'),
(6, 'Ultra Pro Max', 'Best for medium business owners, startups.', 300, '$', 300, 140, '{\"icon\":{\"1\":\"las la-check\",\"2\":\"las la-check\",\"3\":\"las la-check\",\"4\":\"las la-check\",\"5\":\"las la-check\"},\"label\":{\"1\":\"300 Connects\",\"2\":\"Best of Developers\",\"3\":\"Made with TailwindCSS\",\"4\":\"Premium Support\",\"5\":\"Future Updates\"},\"strike\":{\"1\":false,\"2\":false,\"3\":false,\"4\":false,\"5\":false}}', '(%)las la-check(%)las la-check(%)las la-check(%)las la-check(%)las la-check(%)', '(%)300 Connects(%)Best of Developers(%)Made with TailwindCSS(%)Premium Support(%)Future Updates(%)', '(%)false(%)false(%)false(%)false(%)false(%)', 0, NULL, 'Active', 1, NULL, '2023-08-20 21:37:55', '2023-08-22 19:50:40'),
(7, 'New Dummy 1', 'sadfas', 10, '$', 10, 5, '{\"icon\":{\"1\":\"las la-check\"},\"strike\":{\"1\":false},\"label\":{\"1\":\"aa\"}}', '(%)las la-check(%)', '(%)aa(%)', '(%)false(%)', 0, NULL, 'In Active', 1, NULL, '2023-08-22 18:41:41', '2023-09-14 20:44:13');

-- --------------------------------------------------------

--
-- Table structure for table `self_managed_participant`
--

CREATE TABLE `self_managed_participant` (
  `id` int(11) NOT NULL,
  `user_ref_id` int(11) DEFAULT NULL,
  `about_you` text DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `self_describe_explain` text DEFAULT NULL,
  `services_you_need` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `self_managed_participant`
--

INSERT INTO `self_managed_participant` (`id`, `user_ref_id`, `about_you`, `gender`, `self_describe_explain`, `services_you_need`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 9, 'I am 28 years old living with my parents. I\'ve interests in making sketches, painting and music.\nLooking for support of travel & transport for appointments from doctor and for some grocery', 'Female', NULL, '(%)55(%)58(%)', 'active', '2023-09-19 13:18:28', '2024-01-30 00:26:16');

-- --------------------------------------------------------

--
-- Table structure for table `support_worker`
--

CREATE TABLE `support_worker` (
  `id` int(11) NOT NULL,
  `user_ref_id` int(11) DEFAULT NULL,
  `about_you` text DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `self_describe_explain` varchar(255) DEFAULT NULL,
  `cultural_diversity` varchar(255) DEFAULT NULL,
  `is_english_main_language` varchar(255) DEFAULT NULL,
  `main_language` int(11) DEFAULT NULL,
  `other_language` varchar(255) DEFAULT NULL,
  `emergency_name` varchar(255) DEFAULT NULL,
  `emergency_email` varchar(255) DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `emergency_relationship` varchar(255) DEFAULT NULL,
  `any_health_conditions` varchar(255) DEFAULT NULL,
  `any_health_conditions_details` text DEFAULT NULL,
  `any_existing_injury` varchar(255) DEFAULT NULL,
  `any_existing_injury_details` text DEFAULT NULL,
  `clad_background` varchar(255) DEFAULT NULL,
  `identify_as_lesbian` varchar(255) DEFAULT NULL,
  `any_guilt` varchar(255) DEFAULT NULL,
  `work_status` int(11) DEFAULT NULL,
  `availability` int(11) DEFAULT NULL,
  `days_availability` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`days_availability`)),
  `days_availability_from` varchar(255) DEFAULT NULL,
  `days_availability_to` varchar(255) DEFAULT NULL,
  `days_availability_na` varchar(255) DEFAULT NULL,
  `availability_hour_range_dr_ref_id` int(11) DEFAULT NULL,
  `willing_to_provide` varchar(255) DEFAULT NULL,
  `willing_to_provide_other` text DEFAULT NULL,
  `have_experience` varchar(255) DEFAULT NULL,
  `years_of_experience` int(11) DEFAULT NULL,
  `work_experience` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`work_experience`)),
  `work_experience_job_title` varchar(255) DEFAULT NULL,
  `work_experience_company_name` varchar(255) DEFAULT NULL,
  `work_experience_industry` varchar(255) DEFAULT NULL,
  `work_experience_job_role` varchar(255) DEFAULT NULL,
  `work_experience_still_working` varchar(255) DEFAULT NULL,
  `work_experience_start_date` varchar(255) DEFAULT NULL,
  `work_experience_end_date` varchar(255) DEFAULT NULL,
  `further_experience` varchar(255) DEFAULT NULL,
  `further_experience_other` text DEFAULT NULL,
  `gender_preferences` varchar(255) DEFAULT NULL,
  `gender_preferences_other` text DEFAULT NULL,
  `have_car` varchar(255) DEFAULT NULL,
  `is_car_insurance` varchar(255) DEFAULT NULL,
  `km_to_travel` int(11) DEFAULT NULL,
  `km_to_travel_other` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_worker`
--

INSERT INTO `support_worker` (`id`, `user_ref_id`, `about_you`, `gender`, `self_describe_explain`, `cultural_diversity`, `is_english_main_language`, `main_language`, `other_language`, `emergency_name`, `emergency_email`, `emergency_contact`, `emergency_relationship`, `any_health_conditions`, `any_health_conditions_details`, `any_existing_injury`, `any_existing_injury_details`, `clad_background`, `identify_as_lesbian`, `any_guilt`, `work_status`, `availability`, `days_availability`, `days_availability_from`, `days_availability_to`, `days_availability_na`, `availability_hour_range_dr_ref_id`, `willing_to_provide`, `willing_to_provide_other`, `have_experience`, `years_of_experience`, `work_experience`, `work_experience_job_title`, `work_experience_company_name`, `work_experience_industry`, `work_experience_job_role`, `work_experience_still_working`, `work_experience_start_date`, `work_experience_end_date`, `further_experience`, `further_experience_other`, `gender_preferences`, `gender_preferences_other`, `have_car`, `is_car_insurance`, `km_to_travel`, `km_to_travel_other`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 7, 'dsfsadFasdfasdf\nasdfasdfasdf asdf asdf asdf asdfa\n sdf asdf asdf as', 'Male', NULL, 'Yes', 'No', 2, '(%)4(%)6(%)', 'Kashif Fazal', 'kashiffazalfullstack@gmail.com', '03152048416', 'Brother', 'No', NULL, 'Yes', 'sdfdasdfa\nsdf', 'No', 'No', 'No', 1, 10, '{\"day\":{\"1\":\"Monday\",\"2\":\"Tuesday\",\"3\":\"Wednesday\",\"4\":\"Thursday\",\"5\":\"Friday\",\"6\":\"Saturday\",\"7\":\"Sunday\"},\"from\":{\"1\":\"01:00 AM\",\"2\":\"-\",\"3\":\"-\",\"4\":\"-\",\"5\":\"-\",\"6\":\"-\",\"7\":\"-\"},\"to\":{\"1\":\"08:00 AM\",\"2\":\"-\",\"3\":\"-\",\"4\":\"-\",\"5\":\"-\",\"6\":\"-\",\"7\":\"-\"},\"not_available\":{\"1\":false,\"2\":true,\"3\":true,\"4\":true,\"5\":true,\"6\":true,\"7\":true}}', '(%)01:00 AM(%)-(%)-(%)-(%)-(%)-(%)-(%)', '(%)08:00 AM(%)-(%)-(%)-(%)-(%)-(%)-(%)', NULL, 4, '(%)13(%)17(%)', NULL, 'Yes', 22, '{\"job_title\":{\"1\":\"Developer\"},\"company_name\":{\"1\":\"BPO\"},\"industry\":{\"1\":5},\"job_role\":{\"1\":\"Web Developer\"},\"still_working\":{\"1\":true},\"end_date\":{\"1\":\"\"},\"start_date\":{\"1\":\"2023-09-17T15:06:22.547Z\"}}', '(%)Developer(%)', '(%)BPO(%)', '(%)5(%)', '(%)Web Developer(%)', '(%)true(%)', '(%)2023-09-17T15:06:22.547Z(%)', '(%)(%)', '(%)36(%)42(%)', NULL, 'Male', NULL, 'No', NULL, 54, 'sdfasdf', 'Active', '2023-09-17 20:06:33', '2023-09-17 20:11:44'),
(2, 10, 'I am an experience support worker having disability qualification and nursing diploma.\nI also have all necessary NDIS checks along with police clearance.\nWould love to grow my career in this field. ', 'Male', NULL, 'Prefer not to say', 'Yes', NULL, '(%)56(%)132(%)', 'Hafsa', 'hafsasami18@gmail.com', '+92 336 4918217', 'Partner', 'No', NULL, 'No', NULL, 'No', 'No', 'No', 2, 8, NULL, NULL, NULL, NULL, NULL, '(%)11(%)12(%)15(%)19(%)13(%)', NULL, 'Yes', 23, '{\"job_title\":{\"1\":\"Support Worker\"},\"company_name\":{\"1\":\"Rose Disability Services\"},\"industry\":{\"1\":1},\"job_role\":{\"1\":\"Support Worker/Cleaner\"},\"still_working\":{\"1\":true},\"end_date\":{\"1\":null},\"start_date\":{\"1\":\"2022-09-02T10:14:01.454Z\"}}', '(%)Support Worker(%)', '(%)Rose Disability Services(%)', '(%)1(%)', '(%)Support Worker/Cleaner(%)', '(%)true(%)', '(%)2022-09-02T10:14:01.454Z(%)', '(%)(%)', '(%)33(%)35(%)38(%)39(%)45(%)', NULL, 'Prefer not to say', NULL, 'Yes', 'Yes', 53, NULL, 'Active', '2023-09-19 15:15:42', '2023-09-19 15:15:42'),
(3, 11, 'I am energetic and young, willing to prove myself in this industry\nI have experience of 2 years as support worker\n', 'Male', NULL, 'No', 'Yes', NULL, '(%)27(%)4(%)', 'Shahid', 'shahid123@yaoo.com', '0345 2952228', 'Brother', 'No', NULL, 'No', NULL, 'No', 'No', 'No', 2, 7, NULL, NULL, NULL, NULL, NULL, '(%)12(%)14(%)15(%)16(%)18(%)19(%)', NULL, 'Yes', 23, '{\"job_title\":{\"1\":\"Casual Support Worker\"},\"company_name\":{\"1\":\"True Care Services\"},\"industry\":{\"1\":2},\"job_role\":{\"1\":\"Cleaner\"},\"start_date\":{\"1\":\"2022-07-06T10:27:30.372Z\"},\"end_date\":{\"1\":\"2023-06-30T10:27:43.109Z\"}}', '(%)Casual Support Worker(%)', '(%)True Care Services(%)', '(%)2(%)', '(%)Cleaner(%)', NULL, '(%)2022-07-06T10:27:30.372Z(%)', '(%)2023-06-30T10:27:43.109Z(%)', '(%)33(%)35(%)46(%)', NULL, 'Female', NULL, 'Yes', 'Yes', 51, NULL, 'Active', '2023-09-19 15:28:51', '2023-09-19 15:28:51'),
(4, 12, 'hi', 'Male', NULL, 'Yes', 'Yes', NULL, '(%)33(%)', 'Shahid Ilyas', 'hamnashahid47@gmail.com', '+923462863350', 'father', 'No', NULL, 'Yes', 'head', 'Yes', 'No', 'No', 2, 4, NULL, NULL, NULL, NULL, NULL, '(%)12(%)', NULL, 'No', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(%)33(%)', NULL, 'Male', NULL, 'Yes', 'Yes', 53, NULL, 'Active', '2023-09-19 16:28:47', '2023-09-19 16:28:47');

-- --------------------------------------------------------

--
-- Table structure for table `sw_message`
--

CREATE TABLE `sw_message` (
  `id` int(11) NOT NULL,
  `sw_ref_id` int(11) DEFAULT NULL,
  `sw_user_ref_id` int(11) DEFAULT NULL,
  `pr_ref_id` int(11) DEFAULT NULL,
  `pr_user_ref_id` int(11) DEFAULT NULL,
  `pr_type` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sw_message`
--

INSERT INTO `sw_message` (`id`, `sw_ref_id`, `sw_user_ref_id`, `pr_ref_id`, `pr_user_ref_id`, `pr_type`, `message`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 1, 7, 1, 13, 'ndis', 'sd fasd fasdfasd fa\nd', 'msg', '2023-09-25 20:25:04', '2023-09-25 20:25:04'),
(2, 1, 7, 1, 13, 'ndis', 'asf asdfaf', 'msg', '2023-09-25 20:28:43', '2023-09-25 20:28:43'),
(3, 1, 7, 1, 13, 'ndis', 'sd fas\ndf \nasd \nfsa', 'msg', '2023-09-25 20:29:35', '2023-09-25 20:29:35'),
(4, 4, 12, 1, 13, 'ndis', 'sd sdfsadf \nasd f\nas\ndf', 'msg', '2023-09-25 20:30:07', '2023-09-25 20:30:07'),
(5, 4, 12, 1, 13, 'ndis', 'sadfasdfva\nsdf\nvasd\nf', 'msg', '2023-09-25 20:30:22', '2023-09-25 20:30:22'),
(6, 4, 12, 1, 13, 'ndis', 'df\nsd\nfvs\ndfs\n', 'msg', '2023-09-25 20:30:27', '2023-09-25 20:30:27'),
(7, 4, 12, 1, 13, 'ndis', 'sdf\nasdf\nvsad\nvas\ndfva\nsf', 'msg', '2023-09-25 20:30:38', '2023-09-25 20:30:38'),
(8, 4, 12, 1, 13, 'ndis', ' fsd\nf\nsdv\nsd\nfvads\n', 'msg', '2023-09-25 20:30:44', '2023-09-25 20:30:44'),
(9, 4, 12, 1, 13, 'ndis', 's dfasdf\nsdf asdfasdf asdf\n asdf asdf', 'msg', '2023-09-25 20:31:35', '2023-09-25 20:31:35'),
(10, 4, 12, 1, 13, 'ndis', 'sdfasd f', 'msg', '2023-09-25 20:33:26', '2023-09-25 20:33:26'),
(11, 4, 12, 1, 13, 'ndis', 'd fasdfsad', 'msg', '2023-09-25 20:33:46', '2023-09-25 20:33:46'),
(12, 3, 11, 1, 13, 'ndis', 'asd fasd fas\ndf a\nsdf\n', 'msg', '2023-09-25 20:34:47', '2023-09-25 20:34:47'),
(13, 3, 11, 1, 13, 'ndis', 'adsfd as\ndfasd\nf', 'msg', '2023-09-25 20:35:42', '2023-09-25 20:35:42'),
(14, 3, 11, 1, 13, 'ndis', 's dsfasdf\n asd\nf asdf', 'msg', '2023-09-25 20:36:29', '2023-09-25 20:36:29'),
(15, 3, 11, 1, 13, 'ndis', 'asd sdfasd\nfa sd fas\ndf asdf', 'msg', '2023-09-25 20:37:30', '2023-09-25 20:37:30'),
(16, 3, 11, 1, 13, 'ndis', 'd\ngsdf\nas\ndfas\n f', 'msg', '2023-09-25 20:37:39', '2023-09-25 20:37:39'),
(17, 2, 10, 1, 13, 'ndis', 'a dfa\nsdf\n as\ndf a\nsdf \n', 'msg', '2023-09-25 20:38:08', '2023-09-25 20:38:08'),
(18, 2, 10, 1, 13, 'ndis', 'sd fas\ndfa\nd sdf\n asd f\n', 'msg', '2023-09-25 20:38:20', '2023-09-25 20:38:20'),
(19, 2, 10, 1, 13, 'ndis', '\n dfas\nd f\nasdf\n asd\nf as\nd', 'msg', '2023-09-25 20:38:33', '2023-09-25 20:38:33'),
(20, 2, 10, 1, 13, 'ndis', '\ns\nd \nzdc \nasd\n as \nd\n', 'msg', '2023-09-25 20:38:46', '2023-09-25 20:38:46'),
(21, 2, 10, 1, 13, 'ndis', 'sd\n asd\nfa \nds \nas', 'msg', '2023-09-25 20:38:59', '2023-09-25 20:38:59'),
(22, 2, 10, 1, 13, 'ndis', ' dsf\nas\ndf as\ndf \nasdf\n', 'msg', '2023-09-25 20:39:08', '2023-09-25 20:39:08'),
(23, 1, 7, 1, 13, 'ndis', 'as dsfd asd\nf asdfasd\n', 'msg', '2023-09-25 20:39:20', '2023-09-25 20:39:20'),
(24, 2, 10, 1, 13, 'ndis', 'sad fsad fasd fasdf', 'msg', '2023-09-25 20:39:28', '2023-09-25 20:39:28'),
(25, 4, 12, 1, 13, 'sw', 'This is demo', 'reply', '2024-01-30 00:30:27', '2024-01-30 00:30:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `street_address` varchar(255) DEFAULT NULL,
  `suburb` varchar(255) DEFAULT NULL,
  `post_code` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `country_to_born` int(11) DEFAULT NULL,
  `hear_about_us` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `complete_by_type` tinyint(1) DEFAULT NULL,
  `sw_ref_id` int(11) DEFAULT NULL,
  `sm_ref_id` int(11) DEFAULT NULL,
  `ndis_ref_id` int(11) DEFAULT NULL,
  `slug_color` varchar(255) DEFAULT NULL,
  `email_code` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT NULL,
  `mobile_code` varchar(255) DEFAULT NULL,
  `mobile_number_verified` tinyint(1) DEFAULT NULL,
  `forgot_pass_code` varchar(255) DEFAULT NULL,
  `package_ref_id` int(11) DEFAULT NULL,
  `package_free` tinyint(1) DEFAULT NULL,
  `payment_done` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `date_of_birth`, `mobile_number`, `street_address`, `suburb`, `post_code`, `state`, `latitude`, `longitude`, `country_to_born`, `hear_about_us`, `email`, `username`, `password`, `profile_image`, `company_logo`, `status`, `type`, `complete_by_type`, `sw_ref_id`, `sm_ref_id`, `ndis_ref_id`, `slug_color`, `email_code`, `email_verified`, `mobile_code`, `mobile_number_verified`, `forgot_pass_code`, `package_ref_id`, `package_free`, `payment_done`, `createdAt`, `updatedAt`) VALUES
(1, 'Kashif', 'Fazal', NULL, '+92 315 2048 416', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'kashiffazal99@gmail.com', 'kashiffazal99@gmail.com', '123456', '1-p-img.png', NULL, 'Active', 'ua', 1, NULL, NULL, NULL, '#5a933f', '1', NULL, '1', NULL, NULL, NULL, NULL, NULL, '2023-09-13 14:02:42', '2023-09-15 01:10:49'),
(2, 'Abid', 'Ilyas', NULL, '+92 344 2899451', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'abidilyas786@gmail.com', 'abidilyas786', '123456', '2-p-img.png', NULL, 'Active', 'ua', NULL, NULL, NULL, NULL, '#5a933f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-13 23:08:41', '2023-09-13 23:08:41'),
(3, 'Hire', 'One', NULL, '+923152048416', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Hireone0@gmail.com', 'Hireone0@gmail.com', '123456', NULL, NULL, 'Active', 'ua', NULL, NULL, NULL, NULL, '#5a933f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-13 23:11:38', '2023-09-13 23:11:38'),
(4, 'Ross ', 'Crabbe', '1989-08-14T10:29:20.798Z', '+92 031 5222 422', '33 Wardlow Way ', 'Balga', '6061', 4, -31.8549, 115.84, 13, 4, 'owais.ecd@gmail.com', 'owais.ecd@gmail.com', 'aplushire123', NULL, NULL, 'In Active', 'sw', NULL, NULL, NULL, NULL, '#7287ff', '783800', NULL, '619371', NULL, NULL, NULL, 0, NULL, '2023-09-15 15:31:57', '2023-09-17 19:59:43'),
(5, 'owais', 'zaidi', '1992-08-17T10:33:38.629Z', '+92 315 2224 223', '33 Wardlow Way', 'Balga', '6061', 4, -31.8549, 115.84, 13, 4, 'owais.aul@gmail.com', 'owais.aul@gmail.com', 'aplushire123', NULL, NULL, 'Not Verified', 'sw', NULL, NULL, NULL, NULL, '#dc663d', '650764', NULL, '905529', NULL, NULL, NULL, 0, NULL, '2023-09-15 15:37:30', '2023-09-15 15:38:29'),
(6, 'owais', 'Zaidi', '1992-08-17T10:41:40.641Z', '+92 346 2863 350', '33 Wardlow Way', 'Balga', '6061', 4, -31.8549, 115.84, 13, 4, 'owais.tcd@gmail.com', 'owais.tcd@gmail.com', 'aplushire95', NULL, NULL, 'Not Verified', 'sw', NULL, NULL, NULL, NULL, '#9136a9', '014669', NULL, '076360', NULL, NULL, NULL, 0, NULL, '2023-09-15 15:44:19', '2023-09-15 15:47:00'),
(7, 'Kashif', 'Fazal', '2023-09-17T15:00:01.603Z', '+92 315 2048 416', 'Karachi', 'Adelaide', '5000', 5, -34.928, 138.601, 5, 6, 'kashiffazal100@gmail.com', 'kashiffazal100@gmail.com', '123', '7-sw-img.png', NULL, 'Active', 'sw', 1, 1, NULL, NULL, '#d698ca', '935255', 1, '700816', 1, NULL, NULL, 0, NULL, '2023-09-17 20:01:36', '2023-09-17 20:11:44'),
(8, 'owais', 'zaidi', '2000-06-18T11:53:34.288Z', '+92 315 2224 223', '240c French Street', 'Tuart Hill', '6060', 4, -31.8971, 115.835, 13, 4, 'owaiszaidi16@gmail.com', 'owaiszaidi16@gmail.com', 'aplushire123', NULL, NULL, 'Active', 'sw', NULL, NULL, NULL, NULL, '#64552b', '790422', 1, '646961', 1, NULL, NULL, 0, NULL, '2023-09-18 17:20:14', '2023-09-18 17:21:15'),
(9, 'Shukura', 'Imana', '1990-06-18T08:06:38.417Z', '+92 315 2224 223', 'Unit 7/438 Camp Road', 'Broadmeadows', '3047', 2, -37.6838, 144.927, 13, 1, 'sm@gmail.com', 'sm@gmail.com', '123456', '9-sm-img.png', NULL, 'Active', 'sm', 1, NULL, 1, NULL, '#e1d3d4', '049376', 1, '212145', 1, NULL, 1, 1, NULL, '2023-09-19 13:08:55', '2024-01-30 00:26:16'),
(10, 'Kashan', 'Mumtaz', '1989-08-17T09:42:44.768Z', '+92 315 2224 223', 'Unit 103, 90 Brunswick Street', 'Fitzroy', '3065', 2, -37.8004, 144.974, 13, 5, 'kashan.ecdservices@gmail.com', 'kashan.ecdservices@gmail.com', 'kashan123', '10-sw-img.png', NULL, 'Active', 'sw', 1, 2, NULL, NULL, '#8d64cc', '896463', 1, '259635', 1, NULL, NULL, 0, NULL, '2023-09-19 14:45:54', '2023-09-19 15:16:45'),
(11, 'Hammad', 'Memon', '1999-05-05T10:18:36.481Z', '+92 315 2224 223', 'Unit 113/229 Hoddle St ', 'Collingwood ', '3066', 2, -37.8022, 144.987, 13, 3, 'hafizhammadmemon38@gmail.com', 'hafizhammadmemon38@gmail.com', 'hammad123', '11-sw-img.png', NULL, 'Active', 'sw', 1, 3, NULL, NULL, '#ade48f', '774304', 1, '032736', 1, NULL, NULL, 0, NULL, '2023-09-19 15:20:28', '2023-09-19 15:28:51'),
(12, 'Zohair', 'SW', '1975-03-31T11:16:06.024Z', '+92 346 2863 350', '22/882 Cooper Street', 'Somerton', '3062', 2, -37.6387, 144.954, 166, 6, 'sw@gmail.com', 'sw@gmail.com', '123456', '12-p-img.png', NULL, 'Active', 'sw', 1, 4, NULL, NULL, '#35de39', '168397', 1, '454571', 1, NULL, NULL, 0, NULL, '2023-09-19 16:20:39', '2024-01-30 00:29:28'),
(13, 'John', 'Carter', '1989-01-06T11:47:23.784Z', '+92 315 2224 223', 'Ormond Road East', 'Geelong', '3219', 2, -38.1594, 144.376, 13, 1, 'ndis@gmail.com', 'ndis@gmail.com', '123456', '13-sm-img.png', '13-logo-img.png', 'Active', 'ndis', 1, NULL, NULL, 1, '#fd9fb8', '230469', 1, '284753', 1, NULL, 1, 1, NULL, '2023-09-19 16:49:41', '2024-01-30 00:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `users_connects`
--

CREATE TABLE `users_connects` (
  `id` int(11) NOT NULL,
  `user_ref_id` int(11) DEFAULT NULL,
  `package_ref_id` int(11) DEFAULT NULL,
  `connects_in` int(11) DEFAULT NULL,
  `connects_out` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_connects`
--

INSERT INTO `users_connects` (`id`, `user_ref_id`, `package_ref_id`, `connects_in`, `connects_out`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 9, 1, 50, NULL, 40, '2023-09-19 13:08:55', '2023-09-19 13:08:55'),
(2, 13, 1, 50, NULL, 40, '2023-09-19 16:49:41', '2023-09-19 16:49:41'),
(3, 13, NULL, NULL, 1, NULL, '2023-09-25 20:25:04', '2023-09-25 20:25:04'),
(4, 13, NULL, NULL, 1, NULL, '2023-09-25 20:28:43', '2023-09-25 20:28:43'),
(5, 13, NULL, NULL, 1, NULL, '2023-09-25 20:30:07', '2023-09-25 20:30:07'),
(6, 13, NULL, NULL, 1, NULL, '2023-09-25 20:30:27', '2023-09-25 20:30:27'),
(7, 13, NULL, NULL, 1, NULL, '2023-09-25 20:30:44', '2023-09-25 20:30:44'),
(8, 13, NULL, NULL, 1, NULL, '2023-09-25 20:33:26', '2023-09-25 20:33:26'),
(9, 13, NULL, NULL, 1, NULL, '2023-09-25 20:33:46', '2023-09-25 20:33:46'),
(10, 13, NULL, NULL, 1, NULL, '2023-09-25 20:34:47', '2023-09-25 20:34:47'),
(11, 13, NULL, NULL, 1, NULL, '2023-09-25 20:35:42', '2023-09-25 20:35:42'),
(12, 13, NULL, NULL, 1, NULL, '2023-09-25 20:36:29', '2023-09-25 20:36:29'),
(13, 13, NULL, NULL, 1, NULL, '2023-09-25 20:38:08', '2023-09-25 20:38:08');

-- --------------------------------------------------------

--
-- Table structure for table `users_connects_total`
--

CREATE TABLE `users_connects_total` (
  `id` int(11) NOT NULL,
  `user_ref_id` int(11) DEFAULT NULL,
  `connects` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_connects_total`
--

INSERT INTO `users_connects_total` (`id`, `user_ref_id`, `connects`, `createdAt`, `updatedAt`) VALUES
(1, 9, 50, '2023-09-19 13:08:55', '2023-09-19 13:08:55'),
(2, 13, 39, '2023-09-19 16:49:41', '2023-09-25 20:38:08');

-- --------------------------------------------------------

--
-- Table structure for table `web_contact_form`
--

CREATE TABLE `web_contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message_type` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_contact_form`
--

INSERT INTO `web_contact_form` (`id`, `name`, `phone`, `email`, `message_type`, `message`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Owais', '0315 123 456 789', 'owais.ecd@gmail.com', 'General feedback', 'Customer feedback is information provided by customers about their experience with a product or service. Its purpose is to reveal their level of satisfaction and help product, customer success, and marketing teams understand where there is room for improvement.', NULL, '2023-09-14 09:07:48', '2023-09-14 09:07:48'),
(2, 'Kashif Fazal', '03152048416', 'kashiffazalfullstack@gmail.com', 'Compliment', 'Test from Live', NULL, '2023-09-14 20:46:10', '2023-09-14 20:46:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `list_countries`
--
ALTER TABLE `list_countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_dropdown`
--
ALTER TABLE `list_dropdown`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_hear_about`
--
ALTER TABLE `list_hear_about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_industries`
--
ALTER TABLE `list_industries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_languages`
--
ALTER TABLE `list_languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_states`
--
ALTER TABLE `list_states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ndis_provider`
--
ALTER TABLE `ndis_provider`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_ref_id` (`user_ref_id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `updatedBy` (`updatedBy`);

--
-- Indexes for table `self_managed_participant`
--
ALTER TABLE `self_managed_participant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_ref_id` (`user_ref_id`);

--
-- Indexes for table `support_worker`
--
ALTER TABLE `support_worker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_ref_id` (`user_ref_id`),
  ADD KEY `main_language` (`main_language`),
  ADD KEY `work_status` (`work_status`),
  ADD KEY `availability` (`availability`),
  ADD KEY `years_of_experience` (`years_of_experience`),
  ADD KEY `km_to_travel` (`km_to_travel`);

--
-- Indexes for table `sw_message`
--
ALTER TABLE `sw_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sw_ref_id` (`sw_ref_id`),
  ADD KEY `sw_user_ref_id` (`sw_user_ref_id`),
  ADD KEY `pr_user_ref_id` (`pr_user_ref_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state` (`state`),
  ADD KEY `country_to_born` (`country_to_born`),
  ADD KEY `hear_about_us` (`hear_about_us`),
  ADD KEY `sw_ref_id` (`sw_ref_id`),
  ADD KEY `sm_ref_id` (`sm_ref_id`),
  ADD KEY `ndis_ref_id` (`ndis_ref_id`),
  ADD KEY `package_ref_id` (`package_ref_id`);

--
-- Indexes for table `users_connects`
--
ALTER TABLE `users_connects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_connects_total`
--
ALTER TABLE `users_connects_total`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `web_contact_form`
--
ALTER TABLE `web_contact_form`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `list_countries`
--
ALTER TABLE `list_countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT for table `list_dropdown`
--
ALTER TABLE `list_dropdown`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `list_hear_about`
--
ALTER TABLE `list_hear_about`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `list_industries`
--
ALTER TABLE `list_industries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `list_languages`
--
ALTER TABLE `list_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `list_states`
--
ALTER TABLE `list_states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ndis_provider`
--
ALTER TABLE `ndis_provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `self_managed_participant`
--
ALTER TABLE `self_managed_participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `support_worker`
--
ALTER TABLE `support_worker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sw_message`
--
ALTER TABLE `sw_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users_connects`
--
ALTER TABLE `users_connects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users_connects_total`
--
ALTER TABLE `users_connects_total`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `web_contact_form`
--
ALTER TABLE `web_contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ndis_provider`
--
ALTER TABLE `ndis_provider`
  ADD CONSTRAINT `ndis_provider_ibfk_1` FOREIGN KEY (`user_ref_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `packages_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `self_managed_participant`
--
ALTER TABLE `self_managed_participant`
  ADD CONSTRAINT `self_managed_participant_ibfk_1` FOREIGN KEY (`user_ref_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `support_worker`
--
ALTER TABLE `support_worker`
  ADD CONSTRAINT `support_worker_ibfk_10633` FOREIGN KEY (`user_ref_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `support_worker_ibfk_10634` FOREIGN KEY (`main_language`) REFERENCES `list_languages` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `support_worker_ibfk_10635` FOREIGN KEY (`work_status`) REFERENCES `list_dropdown` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `support_worker_ibfk_10636` FOREIGN KEY (`availability`) REFERENCES `list_dropdown` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `support_worker_ibfk_10637` FOREIGN KEY (`years_of_experience`) REFERENCES `list_dropdown` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `support_worker_ibfk_10638` FOREIGN KEY (`km_to_travel`) REFERENCES `list_dropdown` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `sw_message`
--
ALTER TABLE `sw_message`
  ADD CONSTRAINT `sw_message_ibfk_793` FOREIGN KEY (`sw_ref_id`) REFERENCES `support_worker` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `sw_message_ibfk_794` FOREIGN KEY (`sw_user_ref_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sw_message_ibfk_795` FOREIGN KEY (`pr_user_ref_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_24886` FOREIGN KEY (`state`) REFERENCES `list_states` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_24887` FOREIGN KEY (`country_to_born`) REFERENCES `list_countries` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_24888` FOREIGN KEY (`hear_about_us`) REFERENCES `list_hear_about` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_24889` FOREIGN KEY (`sw_ref_id`) REFERENCES `support_worker` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_24890` FOREIGN KEY (`sm_ref_id`) REFERENCES `self_managed_participant` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_24891` FOREIGN KEY (`ndis_ref_id`) REFERENCES `ndis_provider` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_24892` FOREIGN KEY (`package_ref_id`) REFERENCES `packages` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
