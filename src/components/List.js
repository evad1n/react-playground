import React from 'react';
import '../styles/List.css'

function TableRow(props) {
    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.age}</td>
            <td>{props.data.desire}</td>
            <td>
                <button onClick={props.remove}>Delete</button>
            </td>
        </tr>
    )
}

function Table(props) {

    //index as key works only because items are added to end of list
    //try adding to start to see and test
    const rows = props.tableData.map((rowData, i) => {
        return (
            <TableRow key={i} data={rowData} remove={() => props.removeRow(i)} />
        )
    })

    return (
        <table className="list-table">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Desires</td>
                    <td>Remove</td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

function AddInput(props) {
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState("");
    const [desire, setDesire] = React.useState("");

    function submit(front) {
        props.addRow({name, age, desire}, front);

        //clear input values
        setName("");
        setAge("");
        setDesire("");
    } 

    return (
        <div className="input">
            <label className="input-text">Name</label>
            <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }}/>
            <label className="input-text">Age</label>
            <input type="number" name="age" value={age} onChange={(e) => { setAge(e.target.value) }}/>
            <label className="input-text">Desire</label>
            <input type="text" name="desire" value={desire} onChange={(e) => { setDesire(e.target.value) }}/>
            <button onClick={() => { submit(true) }} >Add at front</button>
            <button onClick={() => { submit(false) }} >Add at end</button>
        </div >
    )
}

export default function List() {
    const [data, setData] = React.useState([
        {
            name: "Billy",
            age: 42,
            desire: "I want to eat cantaloupes"
        }
    ]);

    function addData(entry, front) {
        front ? setData([entry, ...data]) : setData([...data, entry]);
    }

    function removeData(index) {
        setData(data.filter((data, i) => { return i !== index }))
    }

    return (
        <div className="list-container">
            <h1>This is a list?</h1>
            <Table tableData={data} removeRow={removeData} />
            <AddInput addRow={addData}/>
        </div>
    )
}