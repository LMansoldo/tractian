const MainScreen = (selectedItem = undefined) => {


  return (
    <div>
     
      {selectedItem ? <p>Selected Item: {JSON.stringify(selectedItem)}</p> : <p>No item selected</p>}
    </div>
  );
};

export default MainScreen;