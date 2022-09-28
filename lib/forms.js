export function getFormsList() {
  const data = require('../json/forms.json');
  return data;
}

export async function getFormsIds() {
  const data = await require('../json/forms.json');
  return data.map(forms => {
    return {
      params: {
        id: forms.id
      }
    }
  })
}

export async function getForm(id) {
  const data = await require('../json/forms.json');
  const content = data.find(x => x.id === id);

  return {
    id: content.id,
    title: content.title
  }
}
