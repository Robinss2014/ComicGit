Final Project for CSC 690 at SFSU - ComicGit
=====

Description:

ComitGit is a new way to create comic. User can create a new panel by drawing, resizing, tweaking the colors, replacing the background... The main feature of this project is the story-flow, a tree of panels, where each path is a storyline (comic). The story-flow brings the opportunity to create multiple comics with the same beginning.

----------------------------------------------------------
How to use:

  # clone the git
  $ cd your_repo_root/repo_name
  $ git clone https://github.com/Robinss2014/ComicGit.git
  $ cd ComicGit

  # start the server
  $ node index.js

----------------------------------------------------------


Screenshots:

  Main View:
  
    Main view contains a story-flow gallery. 
    User shall click on the “Start a new story”  to create a story-flow for the new comic;
    User shall click on any existing panel in the story-flow gallery to continue the comic;
    
  ![Main View](https://raw.githubusercontent.com/Robinss2014/ComicGit/master/assets/imgs/index.png)
  
  
  Storyflow View:
  
    A storyflow contains all the storylines beginning with the same panel.
    The user shall click on any panel in the story-flow to view it.
    The user shall hover over any panel to show some hidden tips:
      1.User shall click on “add” to add a new panel into the story-flow
      2.User shall click on “show” to view the current panel he selected
  ![storyflow View](https://raw.githubusercontent.com/Robinss2014/ComicGit/master/assets/imgs/storyflowView.png)
  
  
  Editpanel View:
  
    The user shall create a new panel from here.
    The panel will be a composition of multiple drawing objects.
    He can create a new object using the “create new object” option in the Editing toolbox. 
  ![editpanel View](https://raw.githubusercontent.com/Robinss2014/ComicGit/master/assets/imgs/editpanelView.png)
  
  
  Slideshow View:
  
    The user can view the storyline in this view. 
    The default speed for the slide-show is zero, user can only switch to another slide manually by clicking on the left and right arrows.
    Once the user set up a speed for the slide-show, it will automatically play the slides at this speed.
    If the user click on the “Go back to story-flow”, it will link to the story-flow view.
  ![Slide Show View](https://raw.githubusercontent.com/Robinss2014/ComicGit/master/assets/imgs/slideshowView.png)

----------------------------------------------------------

