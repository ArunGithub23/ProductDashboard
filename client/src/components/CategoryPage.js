import React, { useState, useEffect } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [categoryName, setNewCategoryName] = useState("");
  const [updateCategory, setUpdateCategory] = useState({ categoryid: null, categoryName: "" });

  // Fetch categories from API or initial data
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/category/readcategory");
      const data = await response.json();
      setCategories(data.res1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryName) return alert("Category name is required");
    try {
      await fetch("http://localhost:4000/category/createcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: categoryName }),
      });
      fetchCategories();
      setNewCategoryName("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm(`Are you sure you want to delete this category?${id}`)) {
      try {
        await fetch(`http://localhost:4000/category/deletecategory`, {
          method: "post",
          headers:{'content-type':'application/json'},
          body:JSON.stringify({categoryid:id})
        });
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleUpdateCategory = async () => {
    if (!updateCategory.categoryName) return alert("New category name is required");
    try {
      await fetch("http://localhost:4000/category/updatecategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCategory),
      });
      fetchCategories();
      setShowUpdatePopup(false);
      setUpdateCategory({ id: null, name: "" });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Category Management</h2>
      <button
        style={styles.createButton}
        onClick={() => setShowPopup(true)}
      >
        Create Category
      </button>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.category}</td>
              <td>
                <button
                  style={styles.actionButton}
                  onClick={() => {
                    setUpdateCategory({ categoryid: category.id, categoryName: "" });
                    setShowUpdatePopup(true);
                    
                  }}
                >
                  Update
                </button>
                <button
                  style={styles.actionButton}
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create Popup */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Create Category</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={styles.input}
            />
            <button style={styles.submitButton} onClick={handleCreateCategory}>
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
            <h3>Update Category</h3>
            <input
              type="text"
              placeholder="New Category Name"
              value={updateCategory.categoryName}
              onChange={(e) =>
                setUpdateCategory({ ...updateCategory, categoryName: e.target.value })
              }
              style={styles.input}
            />
            <button
              style={styles.submitButton}
              onClick={handleUpdateCategory}
            >
              Submit
            </button>
            <button
              style={styles.cancelButton}
              onClick={() =>{ setShowUpdatePopup(false)}}
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
    width: "100%",
    borderCollapse: "collapse",
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

export default CategoryPage;
