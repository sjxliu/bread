const React = require("react")
const Default = require("./layout/Default")

function Index(breads){
    return(
        <Default>
            <h2>Index Page</h2>
            <ul>
                {
                    breads.map((bread, index) =>{
                        return(<li key={index}><a href={`/breads/${index}`}></a>{bread.name}</li>)
                    })
                }
            </ul>
        </Default>
    )
}

module.exports = Index;