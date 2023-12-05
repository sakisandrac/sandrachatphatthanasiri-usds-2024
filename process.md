# How to solve this problem
- Input: a string, and a JSON object
- Output: a modified JSON object with just the items that include the search term
- Things to consider: 
    - The object might be empty, or contain items with no content
    - The text might contain capital letters (maybe I should lowercase everything?) NOTE: in the example, when given the word "the" the function only returns the content with the matching cased word, and does not return the one with "The" capitalized
    - It will not pass the tests if i lowercase everything so i will just write about this for future improvements

- Loop through the array of objects, and check if the search string is included the "text" value. if it is, return the page and line, and the ISBN of the book
- Add the matched book into the results array of the output object
- Return the output object
- In terms of loops, a forEach would work, and then push() the matches into the results array
- The content is also an array, so I will have to use another loop in there too
- A reduce might also work so that an array is returned that I can use as the results array

- I am going to try to use reduce, and not worry about books with no scanned content yet, and get that to work first, then go from there to test out edge cases to see how my solution will have to differ.
- Remember to JSONify the output - actually dont need to do this even though there are quotes around the keys in the PDF, it wont pass the test if stringigified 

## Potential Methods I could use:
- Reduce
- forEach
- includes()
- toLowerCase()
- push()