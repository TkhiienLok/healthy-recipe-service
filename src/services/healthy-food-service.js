export default class HealthyFoodService {
  _apiBase = 'https://api.edamam.com';
  params = { 
    app_id: '900da95e', 
    app_key: '40698503668e0bb3897581f4766d77f9' 
  };
  
  
  getResource = async (url, paramsObj) => {
    const urlObj = new URL(`${this._apiBase}${url}`);

    this.params = {
      ...this.params,
      ...paramsObj
    }
    urlObj.search = new URLSearchParams(this.params).toString();
    const res = await fetch(urlObj);
  
    if(!res.ok) {
      throw new Error(`Could not fetch url ${url}, recieved ${res.status}`)
    }
    const body = await res.json();
    return body;
  }

  getTopHealthyRecipies = async () => {
    const recipiesData = await this.getResource(`/search`, { q: 'healthy'});
    return recipiesData.hits.map(this._transformRecipe);
  }

  getHealtyRecipe = async (index) => {
    const recipes = await this.getTopHealthyRecipies();
    return recipes[index];
  }

  _transformRecipe = ({ recipe }, index) => {
    return {
      id: index,
      calories: recipe.calories,
      nutrients: { 
        carbs: Math.round(recipe.totalNutrients.CHOCDF.quantity), 
        fat: Math.round(recipe.totalNutrients.FAT.quantity), 
        protein: Math.round(recipe.totalNutrients.PROCNT.quantity) 
      },
      title: recipe.label,
      imageURL: recipe.image,
      diets: recipe.dietLabels,
      cautions: recipe.cautions,
      totalWeight: recipe.totalWeight,
      url: recipe.url
    }
  }
}


