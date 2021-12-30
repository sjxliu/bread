const React = require("react");
const Default = require("./layout/Default");

function Show({ bread }) {
  let comments = <h3 className="inactive">No Comments Yet!</h3>;
  let rating = <h3 className="inactive">Not Rated Yet</h3>;
  if (data.place.comments.length) {
    comments = data.place.comments.map((c) => {
      return <div className="border col-sm-4"></div>;
    });
  }
  return (
    <Default>
      <main>
        <div className="row">
        <h3>{bread.name}</h3>
        <p>
          and it
          {bread.hasGluten ? <span> does </span> : <span> does NOT </span>}
          have gluten.
        </p>
        <img src={bread.image} alt={bread.name} />
        <p>{bread.getBakedBy()}</p>
        <a href={`/breads/${bread.id}/edit`}>
          <button>Edit</button>
        </a>
        <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
          <input type="submit" value="DELETE"></input>
        </form>
        <li>
          <a href={`/breads/index/edit`}>Edit</a>
        </li>
        <li>
          <a href="/breads">Go Home</a>
        </li>
        </div>
      </main>
    </Default>
  );
}

module.exports = Show;
