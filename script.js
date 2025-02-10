//  BELOW CODE IS WITHOUT COMMMENTS AND BELOW THIS CODE YOU FIND CODE WITH COMMENTS TO UNDERSTAND THE CODE PROPERLY
 
 
 /*  document.addEventListener("DOMContentLoaded", function() {

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    // API URL of the local backend
    const API_URL = "http://localhost:5000/leetcode";

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username })
            });

            if (!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData);
            displayUserData(parsedData);
        } catch (error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData) {
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            { label: "Overall Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
            { label: "Overall Easy Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            { label: "Overall Medium Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            { label: "Overall Hard Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions },
        ];

        console.log("Card Data: ", cardsData);

        cardStatsContainer.innerHTML = cardsData.map(
            data => 
                `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>
                </div>`
        ).join("");
    }



   
    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log("Logging username: ", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });

});
*/


// BELLOW CODE IS COMMENTED CODE TO UNDERSTAND EASILY


/* 
===========================================
   LeetCode User Stats Fetcher
   - This script fetches user statistics from a backend API.
   - It validates the username, fetches data, updates progress bars, and displays stats.
   - Uses JavaScript's Fetch API to communicate with the backend.
===========================================
*/

// Ensure the script only runs after the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", function() {

    /* 
    ===============================
        Selecting DOM Elements
    =============================== 
    */

    const searchButton = document.getElementById("search-btn"); // Button to trigger search
    const usernameInput = document.getElementById("user-input"); // Input field for username
    const statsContainer = document.querySelector(".stats-container"); // Main container for displaying stats

    // Progress bars and labels for different question categories
    const easyProgressCircle = document.querySelector(".easy-progress"); 
    const mediumProgressCircle = document.querySelector(".medium-progress"); 
    const hardProgressCircle = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label"); 
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const cardStatsContainer = document.querySelector(".stats-cards"); // Container for statistics cards

    // API URL of the backend server (Change this URL if running on a different backend)
    const API_URL = "http://localhost:5000/leetcode";

    /* 
    ========================================
       Function: Validate Username Input
    ========================================
       - Ensures the username is not empty.
       - Checks if the username follows valid patterns.
       - Allowed characters: a-z, A-Z, 0-9, underscore (_), and hyphen (-).
       - Maximum length: 15 characters.
    */
    function validateUsername(username) {
        if (username.trim() === "") { // Check if input is empty or only spaces
            alert("Username should not be empty");
            return false; // Stop execution if empty
        }
        
        // Regular expression to validate username format
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        
        // Check if username matches allowed format
        const isMatching = regex.test(username);

        if (!isMatching) {
            alert("Invalid Username"); // Display alert for invalid usernames
        }

        return isMatching; // Return true if valid, false otherwise
    }

    /* 
    ==============================================
       Function: Fetch User Data from Backend
    ==============================================
       - Sends a POST request to the backend API with the username.
       - Displays a "Searching..." message while waiting for data.
       - Handles both success and error cases.
    */
    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = "Searching..."; // Change button text while searching
            searchButton.disabled = true; // Prevent multiple clicks during search

            // Sending a POST request to the backend with username data
            const response = await fetch(API_URL, {
                method: "POST", // HTTP method
                headers: { "Content-Type": "application/json" }, // Set request content type to JSON
                body: JSON.stringify({ username }) // Convert username to JSON format
            });

            // If response status is not OK (e.g., 404, 500), throw an error
            if (!response.ok) {
                throw new Error("Unable to fetch the User details");
            }

            // Convert the response into a JavaScript object (JSON)
            const parsedData = await response.json();

            console.log("Logging data: ", parsedData); // Log response data for debugging

            // Call function to display the fetched data on the page
            displayUserData(parsedData);
        } catch (error) {
            // Display an error message inside the stats container if API call fails
            statsContainer.innerHTML = `<p>${error.message}</p>`;
        } finally {
            // Reset button text and re-enable it after API call is complete
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    /* 
    ================================================
       Function: Update Progress Bar for Stats
    ================================================
       - Calculates the completion percentage.
       - Updates the corresponding progress bar and label.
    */
    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100; // Calculate percentage (solved/total * 100)
        circle.style.setProperty("--progress-degree", `${progressDegree}%`); // Apply to progress bar CSS
        label.textContent = `${solved}/${total}`; // Update label to show solved vs total questions
    }

    /* 
    ========================================
       Function: Display User Data
    ========================================
       - Extracts and displays stats from the API response.
       - Updates progress bars for Easy, Medium, and Hard questions.
       - Generates statistics cards dynamically and adds them to the page.
    */
    function displayUserData(parsedData) {
        // Extract total questions and solved questions from API response
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        // Update progress bars with solved vs total questions
        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        // Create an array of statistics for different categories
        const cardsData = [
            { label: "Overall Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
            { label: "Overall Easy Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            { label: "Overall Medium Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            { label: "Overall Hard Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions },
        ];

        console.log("Card Data: ", cardsData); // Log the generated card data for debugging

        // Render statistics as HTML cards and insert them into the container
        cardStatsContainer.innerHTML = cardsData.map(
            data => 
                `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>
                </div>`
        ).join(""); // Convert the array into a single HTML string
    }

    /* 
    =============================================
       Event Listener: Search Button Click
    =============================================
       - Gets the username input value.
       - Validates the username.
       - Calls the fetch function if username is valid.
    */
    searchButton.addEventListener('click', function() {
        const username = usernameInput.value; // Get input value from the user
        console.log("Logging username: ", username); // Log the entered username for debugging

        // Validate username before making API call
        if (validateUsername(username)) {
            fetchUserDetails(username); // Call function to fetch user details
        }
    });

});
