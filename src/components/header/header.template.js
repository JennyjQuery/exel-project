export function createHeader(title) {
  return `
      <input 
        type="text"
        class="input"
        value="${title}"
        data-type="table-name"
      />
       <div>
         <div class="button" data-type="delete">
           <i class="material-icons">delete</i>
         </div>
         <div class="button" data-type="exit">
           <i class="material-icons">exit_to_app</i>
         </div>
       </div>
    `;
}