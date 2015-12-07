/* 
 * (C) 2015 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

////////////////////////////////////////////////
// Main application class
////////////////////////////////////////////////

function Application() {}

/**
 * Init function - perform all application initialization here, called pre-login 
 */
Application.init = function() {
	// No need for a Login - just go to the main page.
	$$.S_NEEDS_LOGIN = false;
};

/**
 * Load and run the main application, called post-login 
 */
Application.main = function() {
	// Entry point for the application
	$$.loadthtml("app/main.thtml", {});
};