const React = require('react')
const Default = require('./layout/Default')

function Show({bread, index}) {
    console.log(bread)
    return (
        <Default>
            <h2>SHOW PAGE</h2>
            <h3>{bread.name}</h3>
            <p>
                and it
                {
                    bread.hasGluten ? <span> does </span> 
                    : <span> does NOT </span>
                }
                have gluten.
            </p>
            <img src={bread.image} alt={bread.name}/>
            <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
            <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
                <input type="submit" value="DELETE"></input>
                </form>
            <li><a href={`/breads/index/edit`}>Edit</a></li>
            <li><a href="/breads">Go Home</a></li>
        </Default>
    )
}

module.exports = Show