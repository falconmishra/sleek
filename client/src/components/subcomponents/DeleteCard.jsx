import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import axios from "../../axiosbase";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function DeleteCard({ product }) {
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
        <Button
          className="z-10"
          variant="solid"
          color="danger"
          size="lg"
          endDecorator={<DeleteIcon />}
          onClick={() => {
            deleteProduct(product._id);
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
      </Card>
    </div>
  );
}

export default DeleteCard;
