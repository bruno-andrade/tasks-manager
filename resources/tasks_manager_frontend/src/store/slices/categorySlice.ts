import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, createCategory, Category } from "@/services/categoryService";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Thunk para buscar categorias
export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  return await getCategories();
});

// Thunk para criar categoria
export const addCategory = createAsyncThunk("categories/addCategory", async (name: string) => {
  return await createCategory(name);
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erro ao buscar categorias";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export default categorySlice.reducer;