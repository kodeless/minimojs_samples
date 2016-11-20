# minimojs_samples
##Sample and test pages

On this project we have lots of demonstration and test pages. It is being prepared the runner to run the selenium pages (it is in another project right now).

This project has the structure of a minimojs project with the folders:

minimojs__samples/
  |__ components: with reusable htmx components
  |__ error-pages: pages for html errors
  |__ labels: replaceable strings for htmx text
  |__ res: static resources such as css, third parth js (jquery, etc), images, etc...
  |__ templates: html templates for pages and modal windows
  |__ pages: htmx pages and its js resources

Most of the htmx pages are selenium tests. On exemplos folder there are some pure htmx examples.

##Compile the project

To compile the project, first generate the executable jar from minimojs project:
 - On the minimojs folder run:
mvn clean compile assembly:single
 - This will generate the minimojs-0.0.1-jar-with-dependencies.jar inside target folder of minimojs root folder.
-On the terminal, go to the folder where you have the structure folders of a minimojs project (and where this file is located).
 - Execute the command:
java -jar /patht-to-minimo-jar/minimojs-0.0.1-jar-with-dependencies.jar -d /destination-path
 - This will generate the compiled html files on destination-path
 - To access the pages, the generated html files must be on a apache, ngix or any other webserver to server the pages. Then just access the pages as normal html files.
 - To see other options of the minimojs compiler run:
java -jar /patht-to-minimo-jar/minimojs-0.0.1-jar-with-dependencies.jar --help