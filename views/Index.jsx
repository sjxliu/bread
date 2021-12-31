const React = require("react");
// const baker_seed = require("../models/baker_seed")
const Default = require("./layout/Default");

function Index({ breads, bakers, title }) {
  return (
    <Default title={title}>
      <h2>Index Page</h2>
      <h3>Bakers</h3>
      <ul>
        {bakers.map((baker) => {
          <li key={baker._id}>
            <a href={`/bakers/${baker._id}`}>{baker.name}</a>
          </li>;
        })}
      </ul>

      <h3>Breads</h3>
      {/*This is a JSX comment. */}
      {/*<p>I have {breads[0].name} bread!</p>*/}
      <div className="newButton">
        <a href="/breads/new">
          <button>Add a new bread</button>
        </a>
      </div>
      {breads.map((bread) => (
        <li key={bread.id}>
          <a href={`/breads/${bread._id}`}>{bread.name}</a>
        </li>
      ))}
    </Default>
  );
}

module.exports = Index;
