
In regular script loading, the browser loads and executes the script before continuing to render 
the rest of the HTML page. This can lead to a delay in the page rendering, as the browser must wait
 for the script to be downloaded and executed before it can continue.

In async script loading, the browser loads the script in parallel with the rest of the HTML page.

This means that the page can continue to render while the script is being downloaded, reducing the
delay in page rendering. However, the script may not be fully loaded and executed by the time the page is rendered,
so any code that depends on the script may not work correctly.

In deferred script loading, the browser loads the script after the page has been fully rendered.
 This means that the page will be completely visible to the user before any scripts are executed.
  This can improve the user experience, as the user does not have to wait for scripts to load before they
   can interact with the page. However, any code that depends on the script will not be executed until
    the script has been loaded and executed.

It's important to note that the "async" and "defer" attributes can be added to the script
 tag to indicate the loading type. Async is recommended for scripts that don't rely on the page
  load and defer for those that do.

	   SIMPLER EXPLANATION 

[Imagine you're building a big Lego castle and you want to decorate it with some cool figures.
The regular way to do it would be to stop building the castle and put the figures on it one by one before
 continuing to build. This way of doing it can take a long time, and you might get bored waiting.

The async way of doing it would be to build the castle and the figures at the same time. This way,
you can keep building the castle while the figures are being put on, so it won't take as long.
But sometimes, the figures might not be ready when you finish building the castle, so they might not be in the right place.

The deferred way of doing it would be to finish building the castle first and then put the figures on it.
 This way, you can see the whole castle before it's decorated, but it might take a little longer to finish the decorations.

So, the regular way is slow but sure, async is faster but not sure and deferred is slower but sure.]


                    THE DOMContentLoaded
DOMContentLoaded is an event that is fired by the browser when the Document Object Model (DOM)
 has been fully loaded and parsed. This means that the browser has finished loading the HTML and 
 creating the tree-like structure of the page, called the DOM.

In regular script loading, the script is executed as soon as the browser finishes downloading it, 
regardless of whether the DOM has been fully loaded or not. This means that the script might try 
to access and manipulate elements of the page that haven't been loaded yet, which can cause errors.

With async and defer script loading, the script is executed after the DOMContentLoaded event, 
which means that the script can be sure that the DOM has been fully loaded before it runs. 
This can prevent errors from occurring when the script tries to access elements of the page that haven't been loaded yet.

So, the DOMContentLoaded event is like the "castle is finished building" point, 
and the script that is loaded with async or defer attribute can only run after that point,
 making sure the script can manipulate the elements of the page that are already available.