import React, {Component} from 'react';
import Autocomplete from 'react-autocomplete';
import { Link, animateScroll as scroll } from "react-scroll";
import he from 'he';




class Form extends Component {
    constructor(){
        super()
        this.state = {
            userChoice: '',
            message1: '',
            message2: '',
            image: '',
            alt:'',
            selected: ''
        }

    }

    handleSubmit = (userChoice) => {
        //runs checkMethod if userChoice isn't null
        this.checkRecMethod(userChoice)
    }

    //gets keywords out of the fullObject
    getKeywords = (arr) => {
        return arr.map((obj)=>obj.label)
    }

    //removes HTML character encoding from returned message
    removeHtml = (copy) => {
        const div = document.createElement("div");
        div.innerHTML = copy;
        const text = div.textContent || div.innerText || "";
        return text;
    }
    
    checkRecMethod = (userChoice) => {
        const returnedRecycleMethod = 
            //goes through the fullObject and filters out only the object whose 'keywords' key contains the userChoice
            this.props.fullObject.filter((garbageItem)=>{
            return garbageItem.keywords.includes(userChoice)
            });


        const newMessageToPrint = this.removeHtml(he.decode(returnedRecycleMethod[0].body));

        //runs setNewMessage to determine which message to print based on the value of the returned item's 'category' key.  Stores this in the variable newMessageToPrint.  NewMessageToPrint returns an object (created in the setNewMessage component) which contains values for all the properties that need to change in this component's state.

        //sets state.message to newMessageToPrint's properties
        this.setState({
          message1: newMessageToPrint,
        });
        const Scroll = require('react-scroll');
        const scroller = Scroll.scroller;
        (scroller).scrollTo('bottom',{
            smooth: 'easeOutSine',
            duration: 1000,
            offset: -130
        });
        // scroll.scrollToBottom();

      }
    
    //this functionality is specified by the autocomplete component's documentation
    handleSelect = (val)=>{
        this.setState({
            userChoice:val
        })
    }
    //updates the userChoice and erases any existing message
    handleChange = (event) => {
        this.setState({
        userChoice: event.target.value,
        message1: '',
        message2: '',
        image: '',
        alt:''
            })
        }

    // scrollToElement = () => {
    //     const section = document.getElementById('response');
    //     section.scrollIntoView();
    // }

    render(){
        const Scroll = require('react-scroll')
        const Element = Scroll.Element;
        return(
            
            <div>
                <form action="">
                    <Element name="bottom"></Element>
                    <h3>To begin, start typing the item you'd like to recycle in the field below:</h3>
                    <label htmlFor="selectItem">I want to recycle:  </label>
                    <Autocomplete
                        getItemValue={(item) => item.label}
                        items={this.props.autocompleteItems}
                        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        renderItem={(item, isHighlighted) =>
                            <div className="autocomplete" 
                            style={{ background: isHighlighted ? 'rgba(52, 73, 94,1.0)' : 'rgba(141, 148, 152,1.0)'}}>
                            {item.label}
                            </div>
                        }
                        value={this.state.userChoice}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    />
                    
                    <button onClick={(e)=>{
                        e.preventDefault(e) 
                        //if the user has not made a selection
                        if (this.state.userChoice === ''){
                            //return an error message
                            this.setState({
                                message1: 'Please enter an item first.'
                                })
                        } else if (!

                            this.getKeywords(this.props.autocompleteItems).includes(this.state.userChoice)){
                                this.setState({
                                    message1: 'You must choose one of the items on the list.'
                                })
                            }
                        else {
                            //otherwise run handleSubmit with userChoice
                            this.handleSubmit(this.state.userChoice)}
                        //scrolls to bottom of the page
                        // this.scrollToElement(
                        // );
                        }}>
                        Check if it's recyclable!
                     </button>
                </form>
                <section className="response">
                     <div className="responseCopy" id="response">
                         {this.state.message1 ? <p>{this.state.message1}</p> : null}
                     </div>
                </section>
            </div>
        )
    }
}    

export default Form;
