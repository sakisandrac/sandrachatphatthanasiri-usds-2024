/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
// function findSearchTermInBooks(searchTerm, scannedTextObj) {

//     const results = scannedTextObj.reduce((acc, book) => {
//         book.Content.forEach(item => {
//             const words = item.Text.split(" ").filter(word => word !== "");

//             if (words.includes(searchTerm)) {
//                 let text = {
//                     ISBN: book.ISBN,
//                     Page: item.Page,
//                     Line: item.Line
//                 };
//                 acc.push(text);
//             }
//         });
//       return acc;
//     }, []);

//       var result = {
//           "SearchTerm": searchTerm,
//           "Results": results
//       };

//       return result; 
//   }

const createTextObject = (book, i) => ({
  ISBN: book.ISBN,
  Page: book.Content[i].Page,
  Line: book.Content[i].Line
});

const checkForHyphens = (searchTerm, words, book, i, acc) => {
  if (words[words.length - 1].includes('-') && book.Content[i + 1]) {
    const nextBookWords = book.Content[i + 1].Text.split(" ").filter(word => word !== "");
    const combinedWords = `${words[words.length - 1]}${nextBookWords[0]}`.split('-').join('');
    if (combinedWords === searchTerm) {
      acc.push(createTextObject(book, i));
    }
  }
};

const checkWordForSearchTerm = (searchTerm, words, book, i, acc) => {
  if (words.includes(searchTerm)) {
    acc.push(createTextObject(book, i));
  }
};

function findSearchTermInBooks(searchTerm, scannedTextObj) {
  const results = scannedTextObj.reduce((acc, book) => {
    for (let i = 0; i < book.Content.length; i++) {
      const words = book.Content[i].Text.split(" ").filter(word => word !== "");

      checkForHyphens(searchTerm, words, book, i, acc);
      checkWordForSearchTerm(searchTerm, words, book, i, acc);
    }
    return acc;
  }, []);

  return {
    "SearchTerm": searchTerm,
    "Results": results
  };
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Check if the search term does not exist in books that an empty array is returned */
const test3output = {
    "SearchTerm": "apples",
    "Results": []
}

const test3result = findSearchTermInBooks("apples", twentyLeaguesIn);
if (!test3result.Results.length) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", test3output);
    console.log("Received:", test3result);
}

/** Check to see if partial words will return matches (it should not as we want only exact matches) */

const test4output = {
    "SearchTerm": "th",
    "Results": []
}

const test4result = findSearchTermInBooks("th", twentyLeaguesIn);
if (!test4result.Results.length) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", test4output);
    console.log("Received:", test4result);
}

/** Check to see that empty strings will also return no results*/

const test5output = {
    "SearchTerm": "",
    "Results": []
}

const test5result = findSearchTermInBooks("", twentyLeaguesIn);
if (!test5result.Results.length) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 0);
    console.log("Received:", test5result.Results.length);
}

/** Check to see that words hyphened in scanned content is still found*/

const test6output = {
    "SearchTerm": "darkness",
    "Results": [
        { 
            "ISBN": "9780000528531", 
            "Page": 31, 
            "Line": 8 
        }
    ]
}

const test6result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (test6result.Results.length == 1) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", test6output);
    console.log("Received:", test6result);
}