const resDiv = document.getElementById("res");
let data;
//console.log(resDiv);
let appendingg = false;
let lim = 10;
function display(url, smnewdata, limit) {
  //   if (smnewdata) lim = 0;

  //console.log(url)

  let seardata = smnewdata;
  let theUrl = url
    ? url
    : `https://g.tenor.com/v1/trending?key=LIVDSRZULELA&limit=${lim}`;

  if (lim <= 50) {
    fetch(theUrl)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        //console.log(res.results);
        let data = res.results;
        resDiv.innerHTML = "";
        data.map((item, index) => {
          appendingg = true;
          // console.log(item)
          // console.log(item.media[0].gif.url);
          let imgdiv = document.createElement("div");
          imgdiv.setAttribute("class", "resultdiv");
          let img = document.createElement("img");
          img.setAttribute("src", item.media[0].gif.url);
          img.setAttribute("class", "resimg");
          imgdiv.append(img);
          resDiv.append(imgdiv);
          appendingg = false;
        });
      });
  }
}
display();

document.getElementById("searchBtn").addEventListener("click", inputck);
function inputck() {
  let value = document.getElementById("inpdata").value;
  seardata = value;
  //console.log(seardata);
  theUrl = `https://g.tenor.com/v1/search?q=${seardata}&key=LIVDSRZULELA&limit=${lim}`;
  display(theUrl);
}

let serboxevent = document.getElementById("inpdata");

//Debounce function

const debounce = (fn, delay) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      document.getElementById("Loading").textContent = "Loading........";
      let Nevent = document.getElementById("inpdata").value;
      theUrl = `https://g.tenor.com/v1/search?q=${Nevent}&key=LIVDSRZULELA&limit=10`;
      display(theUrl);
      lim = 10;
      fn(theUrl, Nevent, 10);
    }, delay);
  };
};

serboxevent.addEventListener("keydown", debounce(display, 1500));

// Throttleing or infinite scroll

let Options = {
  root: null,
  rootMargin: "0px",
  thresold: 1.0,
};

let Callback = (entries, obsever) => {
  console.log("Found");
  entries.map((entry) => {
    if (entry.target.id === "Loading") {
      if (entry.isIntersecting && !appendingg) {
        // { let Nevent = document.getElementById("inpdata").value;
        let timeout;
        //              clearTimeout(timeout);
        // timeout = setInterval(() =>
        //             {
        if (lim < 50) lim += 10;
        if (lim >= 50) {
          document.getElementById("Loading").textContent = "THE END.";
        }
        let value = document.getElementById("inpdata").value;
        seardata = value;
        //console.log(seardata);
        theUrl = `https://g.tenor.com/v1/search?q=${seardata}&key=LIVDSRZULELA&limit=${lim}`;
        display(theUrl, null, 10, null);
        // },1000)
      }
    }
  });
};

let obsever = new IntersectionObserver(Callback, Options);
obsever.observe(Loading);
