class HTTP {
        
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        return response;
    }
    async get(url) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });
        return response;
    }
    async patch(url,body) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response;
    }
    async post(url,body) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response;
    }

}

const http = new HTTP();
const submit = document.querySelector("input[type='submit']"); 
console.log(submit);
submit.addEventListener("click",sendPost);
function sendDelete(e) {
    e.preventDefault();
    http.delete("http://localhost:8080/events/delete/0");
}

function sendPost(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll(".add-event-input");
    const values = {};

    for (const input of inputs) {
        values[input.id] = input.value;
    }
    http.post("http://localhost:8080/events/post",{
        title: values.title,
        date: values.date,
        start: values.start,
        end: values.end,
        city: values.city,
        country: values.country,
        location: values.location,
        adress: values.adress,
        description: values.description,
        image: values.image,
      });
}


