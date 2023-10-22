package com.utfpr.TCC.service.impl;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

import com.utfpr.TCC.miniopayload.FileResponse;
import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.model.Imagem;
import com.utfpr.TCC.repository.AnimaisRepository;
import com.utfpr.TCC.repository.ImagemRepository;
import com.utfpr.TCC.service.AnimaisService;
import com.utfpr.TCC.service.MinioService;
import com.utfpr.TCC.utils.FileTypeUtils;

@Service
public class AnimaisServiceImpl extends CrudServiceImpl<Animais, Long> implements AnimaisService{
	
	private final AnimaisRepository animaisRepository;
	private final ImagemRepository imagemRepository;
	private final MinioService minioService;
	
	public AnimaisServiceImpl(AnimaisRepository animaisRepository, MinioService minioService, ImagemRepository imagemRepository) {
		this.animaisRepository = animaisRepository;
		this.minioService = minioService;
		this.imagemRepository = imagemRepository;
	}
	
	@Override
	public List<Animais> findByNome(String nome) {
		return animaisRepository.findByNome(nome);
	}

	@Override
	public List<Animais> findByRaca(String raca) {
		return animaisRepository.findByRaca(raca);
	}

	@Override
	public List<Animais> findByPorte(String porte) {
		return animaisRepository.findByPorte(porte);
	}

	@Override
	public List<Animais> findByEspecie(String especie) {
		return animaisRepository.findByEspecie(especie);
	}

	@Override
	public List<Animais> findByPorteAndEspecie(String porte, String especie) {
		return animaisRepository.findByPorteAndEspecie(porte, especie);
	}

	@Override
	public List<Animais> findByPorteAndRaca(String porte, String raca) {
		return animaisRepository.findByPorteAndRaca(porte, raca);
	}

	@Override
	public List<Animais> findByPorteAndNome(String porte, String nome) {
		return animaisRepository.findByPorteAndNome(porte, nome);
	}

	@Override
	public List<Animais> findByRacaAndEspecie(String raca, String especie) {
		return animaisRepository.findByRacaAndEspecie(raca, especie);
	}

	@Override
	public List<Animais> findByRacaAndNome(String raca, String nome) {
		return animaisRepository.findByRacaAndNome(raca, nome);
	}

	@Override
	public List<Animais> findByEspecieAndNome(String especie, String nome) {
		return animaisRepository.findByEspecieAndNome(especie, nome);
	}

	@Override
	public List<Animais> findByPorteAndEspecieAndRaca(String porte, String especie, String raca) {
		return animaisRepository.findByPorteAndEspecieAndRaca(porte, especie, raca);
	}

	@Override
	public List<Animais> findByPorteAndEspecieAndNome(String porte, String especie, String nome) {
		return animaisRepository.findByPorteAndEspecieAndNome(porte, especie, nome);
	}

	@Override
	public List<Animais> findByPorteAndNomeAndRaca(String porte, String nome, String raca) {
		return animaisRepository.findByPorteAndNomeAndRaca(porte, nome, raca);
	}

	@Override
	public List<Animais> findByNomeAndEspecieAndRaca(String nome, String especie, String raca) {
		return animaisRepository.findByNomeAndEspecieAndRaca(nome, especie, raca);
	}

	@Override
	public List<Animais> findByPorteAndEspecieAndRacaAndNome(String porte, String especie, String raca, String nome) {
		return animaisRepository.findByPorteAndEspecieAndRacaAndNome(porte, especie, raca, nome);
	}

	@Override
	protected JpaRepository<Animais, Long> getRepository() {
		return this.animaisRepository;
	}

	@Override
	public Animais saveWithFile(Animais animal, List<MultipartFile> files) {
		List<Imagem> imagens = new ArrayList<>();
		
		for (MultipartFile file : files) {
			String fileType = FileTypeUtils.getFileType(file);
			
			if (fileType != null) {
				FileResponse fileResponse = minioService.putObject(file, "commons", fileType);

				Imagem imagem = new Imagem();
	            imagem.setImagemNome(fileResponse.getFilename());
	            imagem.setConteudoImagem(fileResponse.getContentType());
	            
	            imagens.add(imagem);
			}
		}
		imagemRepository.saveAll(imagens);
		
		LocalDate dataCad = LocalDate.now();
		animal.setDataCadastro(dataCad);
		animal.setImagens(imagens);
		
		return animaisRepository.save(animal);
	}
	
	@Override
	public List<Imagem> findImagensById(Long id) {
		return animaisRepository.findImagensById(id);
	}

	@Override
	public void downloadFile(Long id, HttpServletResponse response) {
		try {
			List<Imagem> imagens = findImagensById(id);
			
			if (imagens != null && !imagens.isEmpty()) {
	            response.setHeader("Content-Disposition", "attachment;filename=imagens.zip");
	            response.setCharacterEncoding("UTF-8");

	            try (OutputStream os = response.getOutputStream(); ZipOutputStream zipOut = new ZipOutputStream(os)) {
	                for (Imagem imagem : imagens) {
	                    String imageName = imagem.getImagemNome();

	                    zipOut.putNextEntry(new ZipEntry(imageName));

	                    InputStream in = minioService.downloadObject("commons", imageName);
	                    IOUtils.copy(in, zipOut);

	                    zipOut.closeEntry();
	                    in.close();
	                }
	            }
	        }else {
	            System.out.println("Erro ao salvar imagens");
	        }
	    } catch (UnsupportedEncodingException e) {
	        System.out.println((e.getMessage()));
	    } catch (IOException e) {
	        System.out.println((e.getMessage()));
	    }
	}

}
