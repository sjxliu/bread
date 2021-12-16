const React = require("react")
const Default = require("./layout/Default")

function Edit({bread, index}){
    return(
        <Default>
            <h2>Edit a Bread</h2>
            <form action={`/breads/${index}?_method=PUT`} method="POST">
                <label htmlFor="name">Name</label>
                <input 
                type="text"
                name="name"
                id="name"
                required
                defaultValue={bread.name}
                ></input>
                <label htmlFor="image">Image</label>
                <input
                type="text"
                name="image"
                id="image"
                defaultValue={bread.image}
                ></input>
                <label htmlFor="hasGluten">Has Gluten</label>
                <input
                type="checkbox"
                name="hasGluten"
                id="hasGluten"
                defaultValue={bread.hasGluten}
                ></input>
            </form>
        </Default>
    )
}

module.exports = Edit