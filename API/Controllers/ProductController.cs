using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> getProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products); // For MVC
            // return Ok(products); // For API
        }

        // [HttpGet("AddProduct")]
        // public IActionResult AddProduct()
        // {
        //     return View(); // For MVC
        // }

        [HttpPost("Add")]
        public async Task<IActionResult> Add(Products product)
        {
            if (ModelState.IsValid)
            {
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();
                return Ok(product);
            }
            return Ok("added successfully");
        }

        // [HttpGet("getProduct/{id}")]
        // public IActionResult getProductById(int id)
        // {
        //     Products product = _context.Products.FirstOrDefault(s => s.Id == id);
        //     if (product == null)
        //     {
        //         return NotFound();
        //     }
        //     return View(product); // For MVC
        // }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateProduct(Products product)
        {
            if (ModelState.IsValid)
            {
                Products item = await _context.Products.FirstOrDefaultAsync(s => s.Id == product.Id);
                if (item == null)
                {
                    return BadRequest("notfound");
                }

                item.Name = product.Name;
                item.Brand = product.Brand;
                item.Price = product.Price;
                item.photoUrl = product.photoUrl;
                await _context.SaveChangesAsync();
                return Ok(product);
            }
            return BadRequest("aaaa");
        }

        [HttpDelete("RemoveProduct/{id}")]
        public async Task<IActionResult> RemoveProduct(int id)
        {
            Products product = await _context.Products.FirstOrDefaultAsync(s => s.Id == id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            _context.Products.Remove(product);
            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok(new { message = "Deleted" });
            }
            
            return BadRequest(new { message = "Something happened" });
        }
    }
}
