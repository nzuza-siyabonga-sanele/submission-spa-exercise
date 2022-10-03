window.addEventListener('load', () => {
    console.log("Running!");
    const app = $('#app');

    const defaultTemplate = Handlebars.compile($('#default-template').html());
    const dictionaryTemplate = Handlebars.compile($('#dictionary-template').html());
    const synonymsTemplate = Handlebars.compile($('#synonyms-template').html());
    const antonymsTemplate = Handlebars.compile($('#antonyms-template').html());

    const router = new Router({
      mode:'hash',
      root:'index.html',
      page404: (path) => {
        const html = defaultTemplate();
        app.html(html);
      }
    });

    router.add('/dictionary', async () => {
      html = dictionaryTemplate();
      app.html(html);
      lookupWord();
    });

    router.add('/antonyms', async () => {
        html = antonymnsTemplate();
        app.html(html);
        lookAntonyms();
      });

    router.add('/synonyms', async () => {
    html = synonymsTemplate();
    app.html(html);
    lookSynonyms();
    });


    router.addUriListener();

    $('a').on('click', (event) => {
      event.preventDefault();
      const target = $(event.target);
      const href = target.attr('href');
      const path = href.substring(href.lastIndexOf('/'));
      router.navigateTo(path);
    });

    router.navigateTo('/');
  });


  function lookAntonyms() {
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const word = data.get("word");

        const options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {

              const exmp = new Array();

              for (let x of data[0].meanings) {
                if(x.antonyms.length > 0){
                  exmp.push(x);
                }
              }
              data = {
                word: data[0].word,
                my: exmp
              };

              const template = document.getElementById('antonyms_results-template').innerText;
              const compiledFunction = Handlebars.compile(template);
              document.getElementById('results').innerHTML = compiledFunction(data);
          });
    });;
}


  function lookSynonyms() {
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const word = data.get("word");

        const options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {

              data = {
                  word: data[0].word,
                  synonyms: data[0].meanings[0].synonyms
              };

              const template = document.getElementById('synonyms_results-template').innerText;
              const compiledFunction = Handlebars.compile(template);
              document.getElementById('results').innerHTML = compiledFunction(data);
          });
    });;
}


  function lookupWord() {
    const form = document.getElementById("lookup-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const word = data.get("word");

        const options = {
            method: 'GET',
        };

        document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, options)
            .then(response => response.json())
            .then(data => {

              const noun = new Array();
              for (let x of data[0].meanings) {
                noun.push(x);
              }

              data = {
                  word: data[0].word,
                  phonetic: data[0].phonetic,
                  src: data[0].phonetics[0].audio,
                  fdd: noun,
              };
                const template = document.getElementById('results-template').innerText;
                const compiledFunction = Handlebars.compile(template);
                document.getElementById('results').innerHTML = compiledFunction(data);
            });
    });;
}

// tag::router[]
window.addEventListener('load', () => {
  const app = $('#app');

  const defaultTemplate = Handlebars.compile($('#default-template').html());
  const dictionaryTemplate = Handlebars.compile($('#dictionary-template').html());
  const synonymsTemplate = Handlebars.compile($('#synonyms-template').html());
  const antonymsTemplate = Handlebars.compile($('#antonyms-template').html());

  const router = new Router({
    mode:'hash',
    root:'index.html',
    page404: (path) => {
      const html = defaultTemplate();
      app.html(html);
    }
  });

  router.add('/dictionary', async () => {
    html = dictionaryTemplate();
    app.html(html);
    lookupWord();
  });

  router.add('/antonyms', async () => {
    html = antonymsTemplate();
    app.html(html);
    lookAntonyms();
  });

  router.add('/synonyms', async () => {
    html = synonymsTemplate();
    app.html(html);
    lookSynonyms();
  });

  router.addUriListener();

  $('a').on('click', (event) => {
    event.preventDefault();
    const target = $(event.target);
    const href = target.attr('href');
    const path = href.substring(href.lastIndexOf('/'));
    router.navigateTo(path);
  });

  router.navigateTo('/');
});
// end::router[]