# Next Steps
- [ ] Define the config model for enter step, and complete step
  - [ ] Define an (Union) type that the complete step method returns (next step, home, go away)
  - [ ] Add Logical function - Pure function - that calculates the next step based on the current process model and the result of the complete step method
- [ ] Add the "enter step" and "complete step" methods to the process store
- [ ] Implement the 2 scenarios in the store
- [ ] Connect the store selected step to the Tabs Control in the Shell Component
  

- [ ] Implemement the "current Info tab" state in the process store
- [ ] Allow to switch current Info tab by the user
- [ ] Connect "current info" to the Tabs Control in the Shell Component




Scenario 1
----------
- User clicks on a tab
- Selected step is updated locally on State
- We call the "Enter Step" API with the newly selected step
  - While we are in "Enter Step" the UI is "busy" 

Scenario 2
----------

- User clicks on the "Complete Step" Button
- We call the "Complete Step" API with the currently selected step
  - While we are in "Complete Step" the UI is "busy"
  - Once the "Complete Step" API is completed, we get a new process model from the server so we switch it locally
  - The "Selected step" does not change yet, we get from the server the same selected step as before
- There is a logic (we will talk about it in a second) that decides what is the next enabled step and selects it in the process model - TBD
- We now switch the current process in the store, so that the new process reflects the newly selected step, task, and everything
- The UI reflects the "selected step"
- And then - the "Enter Step" Process begins exactly as described in Scenario 1



                     Change the current selected step without calculation --|
                                                                            |
Complete Step -----> Calculate the current selected Step          -----------> Enter Step


