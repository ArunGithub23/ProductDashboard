import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [newProduct, setNewProduct] = useState({ productName: "", categoryId: "" });
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    categoryId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products and categories
  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategories();
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      console.log('page num')
      const response = await fetch(
        `http://localhost:4000/product/readproduct/${page}/10`
      );
      const data = await response.json();      
      setProducts(data.res1);
      setTotalPages(Math.ceil(data.totalrows / 10)); // Assuming the API returns totalCount
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/category/readcategory");
      const data = await response.json();
      setCategories(data.res1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.productName || !newProduct.categoryId) {
      return alert("Product name and category are required");
    }
    try {
      await fetch("http://localhost:4000/product/createproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      fetchProducts(currentPage);
      setNewProduct({ productName: "", categoryId: "" });
      setShowPopup(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`http://localhost:4000/product/deleteproduct`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productid: id }),
        });
        fetchProducts(currentPage);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleUpdateProduct = async () => {
    if (!updateProduct.productName) {
      return alert("Product name and category are required");
    }
    try {
      await fetch("http://localhost:4000/product/updateproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      });
      fetchProducts(currentPage);
      setShowUpdatePopup(false);
      setUpdateProduct({ id: null, productName: "" });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Product Management</h2>
      <button style={styles.createButton} onClick={() => setShowPopup(true)}>
        Create Product
      </button>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ border: "2px solid black" }}>
              <td style={{ padding: "10px", textAlign: "center" }}>{product.id}</td>
              <td style={{ padding: "10px", background: "red" }}>{product.productname}</td>
              <td style={{ padding: "10px" }}>{product.category}</td>
              <td style={{ padding: "10px" }}>
                <button
                  style={styles.actionButton}
                  onClick={() => {
                    setUpdateProduct({
                      productid: product.id,
                      productName: product.name,
                      categoryId: product.categoryId,
                    });
                    setShowUpdatePopup(true);
                  }}
                >
                  Update
                </button>
                <button
                  style={styles.actionButton}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev-1)}
        >
          Previous
        </button>
        <span style={styles.pageIndicator}>
          {((currentPage-1)*10)+1} to {currentPage*10} of {totalPages*10}
        </span>
        <button
          style={styles.paginationButton}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev+1)}
        >
          Next
        </button>
      </div>

      {/* Create Popup */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Create Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
              style={styles.input}
            />
            <select
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              style={styles.input}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
            <button style={styles.submitButton} onClick={handleCreateProduct}>
              Submit
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Update Popup */}
      {showUpdatePopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Update Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, productName: e.target.value })
              }
              style={styles.input}
            />
            <button style={styles.submitButton} onClick={handleUpdateProduct}>
              Submit
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => setShowUpdatePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    height:'60vh'
  },
  createButton: {
    padding: "10px 20px",
    marginBottom: "20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: '100%',
    maxHeight: '20vh', // Set the desired height for the table container
    overflowY: 'auto', // Enable vertical scrolling
    border: '1px solid #ccc', // Optional: Border for the container
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better aesthetics
    borderRadius: '8px', // Optional: Rounded corners
  },
  actionButton: {
    padding: "5px 10px",
    margin: "0 5px",
    backgroundColor: "#008CBA",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  paginationButton: {
    padding: "10px 20px",
    margin: "0 10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    disabled: {
      backgroundColor: "#ddd",
      cursor: "not-allowed",
    },
  },
  pageIndicator: {
    fontSize: "16px",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "90%",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    marginLeft: "10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductPage;
