# minimojs_samples
##Sample and test pages

On this project we have lots of demonstration and test pages. It is being prepared the runner to run the selenium pages (it is in another project right now).

This project has the structure of a minimojs project with the folders:
 - __components__: reusable htmx components
 - __error-pages__: pages for html errors
 - __labels__: replaceable strings for htmx text
 - __res__: static resources such as css, third parth js (jquery, etc), images, etc...
 - __templates__: html templates for pages and modal windows
 - __pages__: htmx pages and its js resources

Most of the htmx pages are selenium tests. On __exemplos__ folder there are some pure htmx examples.

##Compile the project

To compile the project, first generate the executable jar from minimojs project:
 - On the minimojs folder run:
__mvn clean compile assembly:single__
 - This will generate the minimojs-0.0.1-jar-with-dependencies.jar inside target folder of minimojs root folder.
 - On a terminal, go to the folder where you have the structure folders of a minimojs project (and where this readme file is located).
 - Execute the command:
__java -jar /patht-to-minimo-jar/minimojs-0.0.1-jar-with-dependencies.jar -d /destination-path__
 - This will generate the compiled html files on __destination-path__ folder.
 - To access the pages, the generated html files must be on a apache, nginx or any other webserver to serve the pages. Then just access the pages as normal html files.
 - To see other options of the minimojs compiler run:
__java -jar /patht-to-minimo-jar/minimojs-0.0.1-jar-with-dependencies.jar --help__

__OBS__: To avoid the generation of html5 application file (that caches all the files on the client) set an environment variable __XDEVMODE=true__. For development mode, it saves some time.
