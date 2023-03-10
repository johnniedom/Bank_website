
The Intersection Observer API is a JavaScript API that allows you to asynchronously observe changes 
 the intersection of an element with a containing element or with the viewport. It consists of two main components:
 the IntersectionObserver object, and the callback function.
1 IntersectionObserver object: This is the object that you create to start observing an element.
 You can create a new IntersectionObserver object by calling the IntersectionObserver constructor and passing in a callback function.
 ///////////////////////////////////////////////////////////
 const observer = new IntersectionObserver(callback);
///////////////////////////////////////////////////////////
2 Callback function: This is the function that will be called whenever an observed element's visibility changes.
 The function is passed an array of IntersectionObserverEntry objects,
one for each observed element that has had a change in visibility.
 Each IntersectionObserverEntry object
contains information about the observed element and its visibility.
///////////////////////////////////////////////////////////
const callback = (entries) => {
  entries.forEach((entry) => {
    // code that should be executed when an element's visibility changes.
    // entry.target is the element that's been observed.
    // entry.intersectionRatio is a value between 0 and 1 representing the percentage of the element that is visible.
  });
};
///////////////////////////////////////////////////////////
3, Start observing: Once you have created the observer object,
you can start observing an element by calling the observe 
method on the observer object, passing the element to observe as an argument.
///////////////////////////////////////////////////////////
const element = document.querySelector('.my-element');
observer.observe(element);
///////////////////////////////////////////////////////////

4 Options: The IntersectionObserver constructor also allows
 you to pass in an options object as a second argument.
///////////////////////////////////////////////////////////
const observer = new IntersectionObserver(callback, {
  root: document.querySelector('#viewport'),
   // the element to use as the viewport
  // for checking visibility of the target,
  // if not provided it defaults to the browser viewport
  rootMargin: '0px',
   // margins around the root.
  // It could be used to expand or shrink the area of intersection
  threshold: [0, 0.25, 0.5, 0.75, 1] // array of numbers between 0 and 1, 
  //indicating at what percentage of visibility an observer's
  // callback should be executed
});

///////////////////////////////////////////////////////////
5 Stop observing: To stop observing an element, you can
 call the unobserve method on the observer object,
 passing the element as an argument.
 You can also use the disconnect() method of the observer 
 object to stop observing all elements and release memory.
///////////////////////////////////////////////////////////
observer.unobserve(element);
// or
observer.disconnect();
///////////////////////////////////////////////////////////

That's the basic usage of Intersection Observer API. 
The example shows you how to create an observer and start observing an element,
 by passing it to the observe() method, and how to stop observing the element 
 using the unobserve() method. The callback function is invoked when an element's 
 visibility changes, with an entry object that carries information about the visibility 
 and the element. Additionally, The options object allows you to configure the viewport, 
 margins, and visibility percentage for triggering callbacks.
