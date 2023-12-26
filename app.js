// Function to display comments
    function displayComments(comments) {
        // Sort comments by sentiment score
        comments.sort((a, b) => b.score - a.score);

        // Generate HTML for comments
        const commentsListElement = document.getElementById('commentsList');
        commentsListElement.innerHTML = comments.map(comment => `
            <p>${comment.score}: ${comment.text}</p>
        `).join('');
    }

    document.getElementById('videoForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous messages
        const errorMessageElement = document.getElementById('errorMessage');
        const successMessageElement = document.getElementById('successMessage');
        errorMessageElement.style.display = 'none';
        successMessageElement.style.display = 'none';

        const videoUrl = document.getElementById('videoUrl').value;

        fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl }),
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            
            // console.log(body);

            if (status !== 200) {
                // Display server error message
                const errorMessageElement = document.getElementById('errorMessage');
                errorMessageElement.textContent = body.error;
                errorMessageElement.style.display = 'block';
            } else if (body.error) {
                // Display error message
                const errorMessageElement = document.getElementById('errorMessage');
                errorMessageElement.textContent = body.error;
                errorMessageElement.style.display = 'block';
            } else {
                // Display success message
                const successMessageElement = document.getElementById('successMessage');
                successMessageElement.textContent = 'Analysis completed successfully!';
                successMessageElement.style.display = 'block';

                // Display sentiment results
                const sentimentResultsElement = document.getElementById('sentimentResults');
                sentimentResultsElement.innerHTML = `
                    <a href="#" id="positiveLink">Positive comments: ${body.positive.length}</a><br>
                    <a href="#" id="negativeLink">Negative comments: ${body.negative.length}</a><br>
                    <a href="#" id="neutralLink">Neutral comments: ${body.neutral.length}</a>
                    <div id="commentsList"></div>
                `;

                // Calculate percentages
                const totalComments = body.positive.length + body.negative.length + body.neutral.length;
                const positivePercentage = (body.positive.length / totalComments) * 100;
                const negativePercentage = (body.negative.length / totalComments) * 100;
                const neutralPercentage = (body.neutral.length / totalComments) * 100;

                // Display percentages
                document.getElementById('positivePercentage').textContent = `${positivePercentage.toFixed(2)}%`;
                document.getElementById('neutralPercentage').textContent = `${neutralPercentage.toFixed(2)}%`;
                document.getElementById('negativePercentage').textContent = `${negativePercentage.toFixed(2)}%`;

                // Show the percentage results
                document.getElementById('percentageResults').style.display = 'block';

                // Add click event listeners
                document.getElementById('positiveLink').addEventListener('click', function(event) {
                    event.preventDefault();
                    displayComments(body.positive);
                });
                document.getElementById('negativeLink').addEventListener('click', function(event) {
                    event.preventDefault();
                    displayComments(body.negative);
                });
                document.getElementById('neutralLink').addEventListener('click', function(event) {
                    event.preventDefault();
                    displayComments(body.neutral);
                });
            }
        })
        .catch((error) => {
            // Display error message
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.textContent = 'An error occurred: ' + error.message;
            errorMessageElement.style.display = 'block';
        });
    });