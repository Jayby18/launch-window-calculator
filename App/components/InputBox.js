import React, { Component } from 'react'
import ReactDOM from 'react'

export default class InputBox extends Component {
    constructor(props) {
        
    }

    render () {
        return (
            <div class="form-label-group">
                <input type="text" id="inputRadius1" class="form-control" placeholder="Radius of parking orbit" onchange="handleInputChange()" oninput="handleInputChange()" required autofocus />
                <label for="inputRadius1">Radius of parking orbit (AU)</label>
            </div>
        )
    }
}