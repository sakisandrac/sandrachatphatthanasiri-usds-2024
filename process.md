# How to solve this problem

## Pseudocode :
- Input: a string, and a JSON object
- Output: a modified JSON object with just the items that include the search term
- Loop through the array of objects, and check if the search string is included the "text" value. if it is, return the page and line, and the ISBN of the book
- Add the matched book into the results array of the output object
- Return the output object
- In terms of loops, a forEach would work, and then push() the matches into the results array
- The content is also an array, so I will have to use another loop in there too
- A reduce might also work so that an array is returned that I can use as the results array

## Things to consider: 
- The object might be empty, or contain items with no content
- The text might contain capital letters (maybe I should lowercase everything?) NOTE: in the example, when given the word "the" the function only returns the content with the matching cased word, and does not return the one with "The" capitalized
- It will not pass the tests if i lowercase everything so i will just write about this for future improvements

## Potential Methods I could use:
- Reduce
- forEach
- includes()
- toLowerCase()
- push()

## Notes while trying to solve:
- I am going to try to use reduce, and not worry about books with no scanned content yet, and get that to work first, then go from there to test out edge cases to see how my solution will have to differ.
- Remember to JSONify the output - actually dont need to do this even though there are quotes around the keys in the PDF, it wont pass the test if stringigified 
- I have to refactor the part where i use "includes" because i want it to return exact matches. right now if i enter "th" for the search term, it will give me results that just have those two letters in the words in the content
    - to do this, i could add a step to split each content text string up so that the words are separated into an array using split() and check if each array contains that words so that it won't do partial matches.

## Tests:
- Test for if the word searched does not exist, make sure the results array is empty
- Test for if a word is capitalized- based on the first test provided is should be case sensitive 
- Test for if there is a partial word match (for example, if search word is "th", results should not return "the")
