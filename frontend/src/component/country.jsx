

function Country(props){
    console.log("props" , props)
    const url = `http://localhost:8000${props.flag}`
    console.log("url" , url)
    return <div>
        
        <p>Country : {props.country}</p>
        <p>Continent : {props.continent}</p>
        <p>rank : {props.rank}</p>
        <img src={url} alt="no-img"/>
    </div>

}

export default Country