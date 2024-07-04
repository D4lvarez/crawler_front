const API_KEY = "93d08ae669msh6eddf2ebf98cbc0p18a741jsne5aed80c0efc";
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '93d08ae669msh6eddf2ebf98cbc0p18a741jsne5aed80c0efc',
    'x-rapidapi-host': 'twitter154.p.rapidapi.com'
  }
};

const searchQuery = (search) => {
  const params = new URLSearchParams({
    query: search,
    section: "top",
    min_retweets: 1,
    limit: 20,
    start_date: new Date().toISOString().slice(0, 10),
    lang: "es"
  });

  fetch(`https://twitter154.p.rapidapi.com/search/search?${params.toString()}`, options)
    .then(res => {
      return res.json();
    })
    .then(res => {
      const data = processData(res.results);
      writeData(data);
    })
    .catch(err => {
      console.debug(err);
    });
}

const processData = (data) => {
  const dataProcessed = [];

  for (let obj of data) {
    const newDate = new Date(obj.creation_date);
    const newObj = {
      username: obj.user.username,
      url: obj.expanded_url,
      published_at: newDate.toLocaleString(),
      retweets: obj.retweet_count,
      likes: obj.favorite_count,
      views: obj.views
    }

    dataProcessed.push(newObj);
  }

  return dataProcessed;
};


const writeData = (data) => {
  const tableBody = document.querySelector("#tableBody");

  for (let v of data) {
    tableBody.innerHTML += `<tr>
          <th>@${v.username}</th>
          <td><a href="${v.url}" target="_blank">Post</a></td>
          <td>${v.published_at}</td>
          <td>${v.retweets}</td>
          <td>${v.likes}</td>
          <td>${v.views}</td>
        </tr>`
  }
}

function catchForm(event) {
  event.preventDefault();

  const querySearch = event.target[0].value;

  searchQuery(querySearch);
}

function clearTable() {
  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = "";
}
