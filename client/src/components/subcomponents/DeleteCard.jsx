import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import axios from "../../axiosbase";
import toast, { Toaster } from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function DeleteCard({ product, updateProducts }) {
  const navigateTo = useNavigate();

  const deleteProduct = (id) => {
    axios.delete(`/product/deleteProduct/${id}`).then((res) => {
      if (res.data.success) {
        toast.success("Product deleted successfully");
        updateProducts(id);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const editProduct = (id) => {
    navigateTo(`/editProduct?slug=${id}`);
  };

  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-between">
            <Button
              onClick={() => {
                toast.dismiss(t.id);
                deleteProduct(id);
              }}
              variant="solid"
              color="danger"
              size="sm"
            >
              Yes
            </Button>
            <Button
              onClick={() => toast.dismiss(t.id)}
              variant="solid"
              color="neutral"
              size="sm"
            >
              No
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  return (
    <div>
      <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 200 }}>
            <img src={product.photo} loading="product" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">{product.company}</Typography>
          <Link
            href="#product-card"
            fontWeight="md"
            color="neutral"
            textColor="text.primary"
            overlay
          >
            {product.name}
          </Link>

          <Typography level="title-lg" sx={{ mt: 1, fontWeight: "xl" }}>
            ₹{product.price}
          </Typography>
          <Typography level="body-sm">
            (Only <b>{product.quantity}</b> left in stock!)
          </Typography>
        </CardContent>
        <div className="flex flex-col-reverse gap-4">
          <Button
            className="z-10"
            variant="solid"
            color="danger"
            size="lg"
            endDecorator={<DeleteIcon />}
            onClick={() => {
              confirmDelete(product._id);
            }}
          >
            Delete Product
          </Button>
          <Button
            className="z-10"
            variant="solid"
            style={{ backgroundColor: "#8f00ff", color: "white" }}
            size="lg"
            onClick={() => {
              editProduct(product.slug);
            }}
            endDecorator={<EditIcon />}
          >
            Edit Product
          </Button>
        </div>
      </Card>
      <Toaster />
    </div>
  );
}

export default DeleteCard;
