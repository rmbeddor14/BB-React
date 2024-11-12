// disable copilot by command+shift+p and search disable copilot 

// here are some tasks

// React CS 100 Practice Tasks (Airplane Edition)

// Category 1: Basic Components
// 1. Greeting Component: Create a component named `Greeting` that returns a <h1> element with the text "Hello, React World!".
// 2. User Welcome: Create a component called `WelcomeUser` that accepts a `name` prop and returns "Welcome, [name]!".
// 3. Simple Paragraph: Create a `Paragraph` component that returns a <p> element with a motivational quote of your choice.
// 4. Date Display: Create a component called `TodayDate` that returns the current date inside a <div>.
// 5. Simple List: Create a `FavoriteFoods` component that renders an unordered list (<ul>) of your three favorite foods.

// Category 2: Event Handling
// 1. Input Logger: Create an `InputLogger` component with a text input that logs every keypress to the console.
// 2. Checkbox Tracker: Create a `CheckboxTracker` component that logs "Checked" or "Unchecked" based on the state of the checkbox.
// 3. Button Click Alert: Make a `ButtonClickAlert` component that displays an alert with "Button clicked!" when clicked.
// 4. Hover Message: Create a `HoverMessage` component that shows "Hovered!" in the console when a user hovers over a <div>.
// 5. Double Click Counter: Make a `DoubleClickCounter` component with a button that logs how many times it has been double-clicked.

// Category 3: Props and State
// 1. User Card: Create a `UserCard` component that accepts `name`, `age`, and `location` props and displays them in a card layout.
// 2. Counter Component: Build a `Counter` component that has a button to increment a count displayed in a <p> element.
// 3. Color Picker: Create a `ColorPicker` component that displays a color name (using state) and a button to change it to a random color.
// 4. Show/Hide Toggle: Make a `ToggleText` component with a button to show or hide some text using state.
// 5. Random Number Generator: Create a `RandomNumber` component that displays a random number between 1 and 100 every time a button is clicked.

// Category 4: Lists and Keys
// 1. Todo List




// from 11.11


// disable copilot 
// import React from 'react'

// function Greetings() {
//   return (
//     <p>Welcome, React Learner</p>
//   )
// }
// export default Greetings; 

// import React from 'react'

// function ClickMeButton() {
//     return (
//         <button onClick={() => console.log("Button Clicked!")}>Click Me!</button>
//     ) 
// }

// export default ClickMeButton;


// Lesson 5: Practicing Event Handling with Input
// Let's continue practicing event handling, this time with a text input.

// Task: Create a new component named "InputLogger" that returns an input element of type "text".
// Add an onChange event handler that logs the current value of the input to the console whenever the user types something.



// import React from 'react'

// function InputLogger() {
    
//     return (

//     <input type = "text" onChange={(e)=>console.log(e.target.value)}></input>

//     )

// }
// export default InputLogger;




// Task 2: Create a new component named "CheckboxLogger" that returns a checkbox input.
// Add an onChange event handler that logs "Checkbox is checked" when the checkbox is checked, and "Checkbox is unchecked" when it is unchecked.


// import React from 'react'

// function CheckboxLogger() {
//   return (
//     <input type = "checkbox" onChange={(e)=>e.target.checked ? console.log("checkbox is checked"): console.log("checkbox isn't checked")} ></input>
    
//   )
// }

// export default CheckboxLogger;

// Task 3: Create a new component named "ButtonClickLogger" that returns a button element with the text "Press Me".
// Add an onClick event handler that logs "Button was pressed!" to the console whenever the button is clicked.


// import React from 'react'

// function ButtonClickLogger() {
//     return (
//         <button onClick={(e)=>console.log("Button was pressed!")} >Press Me!</button>
//     )
// }

// export default ButtonClickLogger;

// category 3: props & state

// 1. User Card: Create a `UserCard` component that accepts `name`, `age`, and `location` props
// and displays them in a card layout.


// import React from 'react';

// function UserCard({name, age, location}) {
//   // Hint: You need to return the JSX using the `return` statement to render it correctly.
//   return (
//     <div className="card">
//       <h2>{name}</h2>
//       <p>Age: {age}</p>
//       <p>Location: {location}</p>
//     </div>
//   );
// }

// // Example usage of the UserCard component for testing purposes within the same file:
// function Prac() {
//   return (
//     <div>
//       <UserCard name="Alice" age={25} location="New York" />
//       <UserCard name="Bob" age={30} location="San Francisco" />
//     </div>
//   );
// }

// export default Prac;


// 4. Show/Hide Toggle: Make a `ToggleText` component with a button to show or hide some text using state.

import React, {useState} from 'react'


function ToggleText({text_input}){ //for props you need to pass with function_name({props})
    const[isVisible, setIsVisible] = useState(text_input)
    return (
        <div>
            {isVisible && <p>{text_input}</p>}
            <button onClick={()=>setIsVisible(!isVisible)}>
                {isVisible ? 'HideText' : 'ShowText'}
            </button>
        </div>
    );
}

function Prac() {
    return (
        <ToggleText text_input = "hey!"></ToggleText> // call props with <function prop_name=prop_value> something but not prop value </close function>
    );
}

export default Prac;