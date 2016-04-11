const AddListButtonComponent = (props) => {
  return (
    <div className="list-wrapper add-list-wrapper">
      <div className="list">
        <input type="button" value="Add list" onClick={props.createList}/>
      </div>
    </div>
  );
};

export default AddListButtonComponent;
