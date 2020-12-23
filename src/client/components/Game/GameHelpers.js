
  export const fillTetri = (newTetri, frontGrid, setTetri, setFrontGrid) => {
    let newGrid = frontGrid.map(row => row.map(value => 0));
    setTetri(newTetri);
    newTetri.tetri.map(value => {
      newGrid[newTetri.position.y + value.y][newTetri.position.x + value.x] = 1;
    });
    setFrontGrid([...newGrid]);
  };