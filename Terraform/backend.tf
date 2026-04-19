terraform {
  backend "s3" {
    bucket         = "sachin-terraform-state-gitops-2026"
    key            = "eks/dev/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-lock"
    encrypt        = true
  }
}