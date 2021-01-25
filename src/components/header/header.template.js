export function createHeader(state) {
  return `
      <input 
        type="text"
        class="input"
        value="${state.tableName}"
        data-type="table-name"
      />
       <div>
         <div class="button">
           <i class="material-icons">delete</i>
         </div>
         <div class="button">
           <i class="material-icons">exit_to_app</i>
         </div>
       </div>
    `;
}