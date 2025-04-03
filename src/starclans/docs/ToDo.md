### ToDo:
- Add cache busting
- skeleton loading while the user waits on the page
- research 1 tech at a time workflow
- scan for conflict, roster gladiator, resolve workflow
- show api processing on relevant gladiator cards
- make gladiator cards clickable instead of ... dropdown option
- alt gladiator card that is a 'row' / horizontal view appropriate for a mobile list


#### Next Battle Steps:
- add button for loading some gladiators from state
- add button for loading some enemies from state
- update projected power for each side / projected chance of winning
- add button to resolve conflict and randomly roll actual values and pick a winning side


Eventually we'll need:
Enable user to swap gladiators into their lineup and hit save
View previously completed battles
Click on gladiator cards and go to a profile view that shows previous battles and more stats


## Design Brainstorming
- just use certain times during the day that events play out?
- if we use generic enemies (orc, bot, barbarian, etc) we probably want a way to group them / assign a category
- enemies should be part of the object defining conflict assignment parameters
- can I use a simple series of choices in my prompt to add significant randomization?
"Consider the following persona axes when coming up with the core inspiration and tone of the gladiator:
A - color, emotion, family, purpose, technology  
B - poetic, grim, altruistic, competitive, chaotic, lawful  
C - sneaky, tanky, glass cannon, strong, wildcard, leader"