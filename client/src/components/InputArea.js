import React from "react";

function InputArea(props) {
    return (
        <div className="form">
            <input
                onChange={(event) => {
                    props.onChanging(event);
                }}
                name="name"
                type="text"
                value={props.value}
            />
            <button onClick={props.onClicking}>
                <span>Add</span>
            </button>
        </div>
    );
}

export default InputArea;
