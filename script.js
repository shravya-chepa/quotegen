const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        //catch error here
        
    }
}

// show new quote
function newQuote(){
    // pick a random quote from apiQuotes array
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    quoteText.textContent = quote.text;
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if( quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove("long-quote");
    }
    //hide loader
    complete();

}

// to tweet a quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();