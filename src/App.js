import "./styles.css";
import data from "./mockdata.json";
import PullDownRefresher from "./pull-down-refresher";
export default function App() {
  return (
    <div className="App">
      <PullDownRefresher minPull={150} />
      <h1>Pull down to refresh :)</h1>
      <table>
        <tr>
          <th>id</th>
          <th>first name</th>
          <th>last name</th>
        </tr>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
